import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";
// import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// let store;

// AddOnSdk.ready.then(async () => {
//     store = AddOnSdk.instance.clientStorage;
// })

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function start() {
    // APIs to be exposed to the UI runtime
    // i.e., to the `index.html` file of this add-on.
    const sandboxApi = {
        createRectangle: () => {
            const rectangle = editor.createRectangle();

            // Define rectangle dimensions.
            rectangle.width = 240;
            rectangle.height = 180;

            // Define rectangle position.
            rectangle.translation = { x: 10, y: 10 };

            // Define rectangle color.
            const color = { red: 0.32, green: 0.34, blue: 0.89, alpha: 1 };

            // Fill the rectangle with the color.
            const rectangleFill = editor.makeColorFill(color);
            rectangle.fill = rectangleFill;

            // Add the rectangle to the document.
            const insertionParent = editor.context.insertionParent;
            insertionParent.children.append(rectangle);
        },
        listChildren: async () => {
            try {
                console.log("Start of function");
                var jsonData = [];
                // https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/document-apis/classes/ExpressRootNode/
                const documentRoot = editor.documentRoot;
                // https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/document-apis/classes/PageList/
                const pages = documentRoot.pages;
                console.log(`Document Root ID: ${documentRoot.id}`);
                console.log(`Number of pages: ${pages.length}`);
                // https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/document-apis/classes/PageNode/
                for (const page of pages) {
                    var branchData = [{id: page.id}, []]
                    console.log(`Page: ${page.name} (ID: ${page.id})`);
                    console.log(`Type: ${page.type}`);
                    const pageNodeChildren = page.allChildren;
                    // https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/document-apis/classes/VisualNode/
                    for (const pageNodeChild of pageNodeChildren) {
                        console.log(`Child: ${pageNodeChild.name} (ID: ${pageNodeChild.id})`);
                        console.log(`Type: ${pageNodeChild.type}`);
                        const visualNodeChildren = pageNodeChild.allChildren;
                        for (const visualNodeChild of visualNodeChildren) {
                            branchData[1].push({
                                id: visualNodeChild.id,
                                x: visualNodeChild.translation.x,
                                y: visualNodeChild.translation.y
                            })
                            // https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/document-apis/classes/TextNode/
                            console.log(`Child: ${visualNodeChild.name} (ID: ${visualNodeChild.id})`);
                            console.log(`Type: ${visualNodeChild.type}`);
                            // https://developer.adobe.com/express/add-ons/docs/references/document-sandbox/document-apis/interfaces/Point/
                            console.log(`Parent: ${visualNodeChild.parent.name} (ID: ${visualNodeChild.parent.id}) Type: ${visualNodeChild.parent.type}`)
                            console.log(`Translation: x - ${visualNodeChild.translation.x} y - ${visualNodeChild.translation.y}`)
                            // if (visualNodeChild.type === "Text") {
                                // visualNodeChild.setPositionInParent({
                                //     x: visualNodeChild.parent.width,
                                //     y: visualNodeChild.parent.height
                                // }, {
                                //     x: 0,
                                //     y: 0
                                // });
                                // visualNodeChild.setRotationInParent(Math.round(360),{ x: 0, y: 0 });
                            // }
                            // console.log(`Translation: x - ${visualNodeChild.translation.x} y - ${visualNodeChild.translation.y}`)
                        }
                    }
                    jsonData.push(branchData)
                }
                return JSON.stringify(jsonData)
            } catch (error) {
                console.error("Error listing children:", error);
            }
        },
        randomFun: async () => {
            try {
                console.log("Start of function");
                const documentRoot = editor.documentRoot;
                const pages = documentRoot.pages;
                for (const page of pages) {
                    const pageNodeChildren = page.allChildren;
                    for (const pageNodeChild of pageNodeChildren) {
                        const visualNodeChildren = pageNodeChild.allChildren;
                        for (const visualNodeChild of visualNodeChildren) {
                            visualNodeChild.setPositionInParent({
                                x: Math.random() * visualNodeChild.parent.width,
                                y: Math.random() * visualNodeChild.parent.height
                            }, {
                                x: 0,
                                y: 0
                            });
                            visualNodeChild.setRotationInParent(Math.round(Math.random() * 360),{ x: 0, y: 0 });
                            // }
                            console.log(`Translation: x - ${visualNodeChild.translation.x} y - ${visualNodeChild.translation.y}`)
                        }
                    }
                }
            } catch (error) {
                console.error("Error random children:", error);
            }
        },
        showVersion: async (data) => {
            try {
                // Clears screen
        const insertionParent = editor.context.insertionParent;
        const children = [...insertionParent.children]; // Copy children to avoid mutation issues

        children.forEach(child => child.removeFromParent());

                // Assuming data[0][1] is an array of objects with x and y properties
                for (const item of data[0][1]) {
                    const rectangle = editor.createRectangle();
        
                    // Define rectangle dimensions
                    rectangle.width = 240;
                    rectangle.height = 180;
        
                    // Define rectangle position
                    rectangle.translation = { x: item.x, y: item.y };
        
                    // Define rectangle color
                    const color = { red: 0.32, green: 0.34, blue: 0.89, alpha: 1 };
        
                    // Fill the rectangle with the color
                    const rectangleFill = editor.makeColorFill(color);
                    rectangle.fill = rectangleFill;
        
                    // Add the rectangle to the document
                    const insertionParent = editor.context.insertionParent;
                    insertionParent.children.append(rectangle);
                }
            } catch (error) {
                console.error("Error showing version:", error);
            }
        }
    };

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);
}

start();
