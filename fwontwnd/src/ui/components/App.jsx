// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import React from "react";
import "./App.css";
import '@spectrum-web-components/picker-button/sp-picker-button.js';
import '@spectrum-web-components/divider/sp-divider.js';
import VersionHistory from "./versionHistory.jsx";
import addOnUISdk, { ClientStorage } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { useState } from "react"
import sortIcon from "./images/sortIcon.png";
import pushIcon from "./images/push_icon.png";
import searchBranchesIcon from "./images/search_branches_icon.png";
import addBranchIcon from "./images/add_branch_icon.png";
import noHistory from "./noHistory.jsx";
import version_image from "./images/versions_image.jpg";

const App = ({ addOnUISdk, sandboxProxy, clientStorage }) => {
    const [currBranch, setCurrBranch] = useState("main")
    const [selectedBranch, setselectedBranch] = useState("second")
    const [numVersions, setnumVersions] = useState(0)
    const [fetchVersion, setfetchVersion] = useState(0)

    function createRect() {
        sandboxProxy.createRectangle();
    }
    async function listChil() {
        const response = await sandboxProxy.listChildren();
        console.log("listChil",response)
        try {
            await initRepo(response)
        } catch (error) {
            console.log(error)
        }
    }
    async function pushModal() {
        await AddOnSdk.ready;

        let dialogOptions = {
            title: "Push current changes onto " + currBranch,
            description: "",
            buttonLabels: {
                primary: "Push",
                cancel: "Cancel"
            },
            variant: "input",
            field: {
                label: "Commit Message",
                placeholder: "Description",
                fieldType: "text",
            },
        };
        try {
            const response = await AddOnSdk.app.showModalDialog(dialogOptions);
            // console.log(response)
            await addApi()
            await commitApi(response.fieldValue)
        } catch (error) {
            console.log(error)
        }
    }
    async function mergeModal() {
        await AddOnSdk.ready;

        let dialogOptions = {
            title: "Merge " + selectedBranch + " to " + currBranch,
            description: "",
            variant: "confirmation",
        };
        try {
            const response = await AddOnSdk.app.showModalDialog(dialogOptions);
        } catch (error) {
            console.log(error)
        }
    }




    async function initRepo(repo) {
        await initApi()
        let store = addOnUISdk.instance.clientStorage;
        try {
            await store.setItem('repository', repo);
            console.log("Value stored in client storage:", store.getItem('repository'));
        } catch (error) {
            console.log('Failed to initialize repository:', error);
        }
    }
    
    async function showStorage() {
        let store = addOnUISdk.instance.clientStorage;
        console.log("Value stored in client storage:", await store.getItem('repository'));
    }

    async function randomFun() {
        const response = await sandboxProxy.randomFun();
        console.log(response)
    }
    async function initApi() {
        try {
            const response = await fetch("http://localhost:3005/init", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "path": "/data",
                }),
            });
    
            if (!response.ok) {
                console.log("init failed");
            } else {
                console.log("init success");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function commitApi(message) {
        try {
            const response = await fetch("http://localhost:3005/commit", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "path": "/data",
                    "message": message,
                }),
            });
    
            if (!response.ok) {
                console.log("commit failed");
            } else {
                console.log("commit success");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    async function statusApi() {
        try {
            const response = await fetch("http://localhost:3005/status?path=data", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            const data = await response.json()
            if (!response.ok) {
                console.log("status failed");
            } else {
                console.log("status success", data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    async function addApi() {
        try {

            await listChil()
            let store = addOnUISdk.instance.clientStorage;
            let jsonData;

            try {
                const rawData = await store.getItem('repository');
                console.log("rawData", rawData)
                if (rawData) {
                    jsonData = JSON.parse(rawData); // Ensure the data is parsed correctly
                } else {
                    console.error("No data found in client storage");
                    return;
                }
            } catch (error) {
                console.error("Error fetching data from client storage:", error);
                return;
            }

            console.log("jsonData", jsonData)
            console.log("jsonData[0][1]", jsonData[0][1])
            let versionFile = jsonData[0][1]
            let fileName = jsonData[0][0]['id'] + String(numVersions) + ".json"

            console.log(versionFile, fileName)

            try {
                const response = await fetch("http://localhost:3005/add", {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "path": "/data",
                        "files": versionFile,
                        "fileName": fileName
                    }),
                });
                
                if (!response.ok) {
                    console.log("add failed");
                } else {
                    console.log("add success");
                    setnumVersions(prevNumVersions => prevNumVersions + 1);
                    await commitApi("Commit")
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }
    
    async function fetchApi() {
        console.log("runnning fetch")
        let store = addOnUISdk.instance.clientStorage;
        let jsonData;
        try {
            const rawData = await store.getItem('repository');
            if (rawData) {
                jsonData = JSON.parse(rawData); // Ensure the data is parsed correctly
            } else {
                console.error("No data found in client storage");
                return;
            }
        } catch (error) {
            console.error("Error fetching data from client storage:", error);
            return;
        }
    
        let fileName = jsonData[0][0]['id'] + String(fetchVersion);

        try {
            const response = await fetch("http://localhost:3005/fetch?path=data/"+fileName+".json", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                console.log("fetch failed");
                const errorText = await response.text();
                console.error("Error response from server:", errorText);
                return;
            }
    
            const data = await response.json();
            console.log("fetch success");
    
            // Replace the second section of jsonData with the fetched data
            jsonData[0][1] = data;
    
            // Store the updated jsonData back to client storage
            await store.setItem('repository', JSON.stringify(jsonData));
            console.log(await store.getItem('repository'));
            showVersion(jsonData)
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function showVersion(data) {
        console.log("runs showVersion")
        sandboxProxy.showVersion(data);
    }
    
    


    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div className="mainContainer">
                <div className = "topContainer">
                    <div>
                        <p className="tittle">Choose A Branch</p>
                        <div className = "headerNav">
                            <div className = "selectingBranchContainer">
                                <div className = "mainArrowContainer">
                                    <p className= "subheading">Main</p>
                                    <sp-picker-button quiet sizeL></sp-picker-button>
                                </div>
                                <img src={sortIcon}></img>
                            </div>
                            <div className = "creatingBranchContainer">
                                <img src={searchBranchesIcon}></img>
                                <img src={addBranchIcon}></img>
                            </div>
                        </div>
                    </div>
                    
                    <div className="actionContainer">
                        <Button className="pushContainer" onClick={pushModal}>
                            <div className="parentDiv">
                                <img className="pushIconImage"src={pushIcon}></img>
                                <p className="pushText">Push Changes</p>
                            </div>
                        </Button>
                        <div className="pullMergeContainer">
                            <Button size="s" className="pullContainer">
                                <div className="pullParentDiv">
                                    <p>Pull Version</p>
                                </div>
                            </Button>
                            <Button disabled size="s" className="mergeContainer" onClick={mergeModal}>
                                <div className="mergeParentDiv">
                                    <p>Merge Versions</p>
                                </div>
                            </Button>
                        </div>
                    </div>

                </div>

                <div className = "bottomContainer">
                    <div className = "versionsParentDiv">
                        <p className="tittle">Versions</p>
                    </div>
                    <div className="versionHistory">
                        {numVersions == 0 ? 
                        <div className="noHistoryContainer">
                            <img className="versionImage" src={version_image}></img>
                            <div className="mainTextContainer">
                                <p className="mainText">Your Adobe Express design versions will appear here</p>
                            </div>
                            <div className="subTextContainer">
                                <p>Click <u>Push Changes</u> to start saving named versions of your design!</p>
                            </div>
                        </div>
                        :
                         Array.from({ length: numVersions }).map((_, i) => (
                            <div key={i}  onClick={() => {
                                setfetchVersion(i);
                                fetchApi();
                            }}>
                                <VersionHistory title={`Version ${i+1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <Button size="m" onClick={createRect}>
                    Create Rectangle
                </Button>
                <Button size="m" onClick={listChil}>
                    List Children
                </Button>
                <Button size="m" onClick={showStorage}>
                    Show Storage
                </Button>
                <Button size="m" onClick={randomFun}>
                    Random
                </Button>
                <Button size="m" onClick={() => commitApi("test message")}>
                    commit
                </Button>
                <Button size="m" onClick={statusApi}>
                    status
                </Button>
                <Button size="m" onClick={addApi}>
                    add curr branch
                </Button>
                <Button size="m" onClick={fetchApi}>
                    fetch branch
                </Button>
                
            </div>
                   
                        

        </Theme>
    );
};

export default App;
