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
import Image from "./images/goose2.png";

const App = ({ addOnUISdk, sandboxProxy, clientStorage }) => {
    const [currBranch, setCurrBranch] = useState("main")


    function createRect() {
        sandboxProxy.createRectangle();
    }
    function listChil() {
        sandboxProxy.listChildren();
    }
    async function pushModal() {
        await AddOnSdk.ready;
        const cancelButtonTextValue = "submit"

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
        } catch (error) {
            console.log(error)
        }
    }
    async function mergeModal() {
        await AddOnSdk.ready;

        let dialogOptions = {
            title: "titleValue",
            description: "test",
            variant: "confirmation",
        };
        try {
            const response = await AddOnSdk.app.showModalDialog(dialogOptions);
        } catch (error) {
            console.log(error)
        }
    }async function testModal() {
        await AddOnSdk.ready;

        let dialogOptions = {
            title: "titleValue",
            description: "test",
            variant: "confirmation",
        };
        try {
            const response = await AddOnSdk.app.showModalDialog(dialogOptions);
        } catch (error) {
            console.log(error)
        }
    }

    async function initRepo() {
        let store = addOnUISdk.instance.clientStorage;
        try {
            const repo = await store.getItem('repository');
            if (repo) {
                console.log('Repository already exists');
            } else {
                const newRepo = {
                    commits: [],
                    files: {}
                };
                await store.setItem('repository', newRepo);
                console.log('Repository initialized');
            }
            console.log("Value stored in client storage:", repo);
        } catch (error) {
            console.log('Failed to initialize repository:', error);
        }
    }
    

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div className="mainContainer">
                <div className="topContainer">
                    <div className="headingContainer">
                        <p>Choose A Branch</p>
                        <div className="headingNav">
                            <div className="branchSelectionContainer">
                                <div className="itemsContainer">
                                    <p>Main</p>
                                    <sp-picker-button quiet></sp-picker-button>
                                </div>
                                <img src={Image}></img>
                            </div>
                            <div className="createBranchContainer">
                                <img src={Image}></img>
                                <img src={Image}></img>
                            </div> 
                        </div> 
                    </div>    
                    <div className="actionContainer">
                        <Button className="pushContainer">
                            <img></img>
                            <p>Push Changes</p>
                        </Button>
                        <div className="pullMergeContainer">
                            <Button className="pullContainer">
                                <p>Pull Version</p>
                            </Button>
                            <Button className="mergeContainer">
                                <p>Merge Versions</p>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bottomContainer">
                    <div className="versionsTextContainer">
                        <p>Versions</p>
                    </div>
                    <div className="versionHistoryContainer">
                        <VersionHistory></VersionHistory>
                    </div>
                </div>                    
                            

                  
                
























                <div className="dropDownContainer">
                    <div className="dropDownItems">
                        <p className ="tittle">Main</p>
                        <sp-picker-button quiet></sp-picker-button>
                    </div>
                    <sp-divider size="m"></sp-divider>
                </div>
                <div className="actionContainers">
                    <button className="pushButton" onClick={pushModal}>
                        <p>Push</p>
                    </button>
                    <button className="pullButton">
                        <p>Pull</p>
                    </button>
                    <button className="mergeButton">
                        <p>Merge</p>
                    </button>
                </div>
                <div className="versionHistory">
                    <VersionHistory></VersionHistory>
                    

                </div>


                <Button size="m" onClick={createRect}>
                    Create Rectangle
                </Button>
                <Button size="m" onClick={listChil}>
                    List Children
                </Button>
                <Button size="m" onClick={testModal}>
                    Open Test Modal
                </Button>
                <Button size="m" onClick={initRepo}>
                    Init Repository
                </Button>
                
            </div>

        </Theme>
    );
};

export default App;
