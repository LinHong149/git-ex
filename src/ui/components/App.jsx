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


const App = ({ addOnUISdk, sandboxProxy }) => {
    function createRect() {
        sandboxProxy.createRectangle();
    }
    function listChil() {
        sandboxProxy.listChildren();
    }
    async function testModal() {
        await AddOnSdk.ready;

        let dialogOptions = {
            title: "titleValue",
            description: "test",
            // buttonLabels: {
            //     primary:
            //     primaryButtonTextValue != "" ? primaryButtonTextValue : undefined,
            //     secondary:
            //     secondaryButtonTextValue != ""
            //         ? secondaryButtonTextValue
            //         : undefined,
            //     cancel:
            //     cancelButtonTextValue != "" ? cancelButtonTextValue : undefined,
            // },
            variant: "confirmation",
        };
        try {
            const response = await AddOnSdk.app.showModalDialog(dialogOptions);
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <Button size="m" onClick={createRect}>
                    Create Rectangle
                </Button>
                <Button size="m" onClick={listChil}>
                    List Children
                </Button>
                <Button size="m" onClick={testModal}>
                    Open Test Modal
                </Button>
                
            </div>
        </Theme>
    );
};

export default App;
