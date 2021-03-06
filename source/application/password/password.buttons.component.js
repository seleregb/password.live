import React from "react"
import copy from "copy-to-clipboard"
import { connect } from "react-redux"
import Button from "@material-ui/core/Button"
import { buttonLabelStyle, buttonStyle, copyPasswordButtonStyle, passwordButtonsComponentStyle, toggleButtonStyle } from "../styles"
import { sendNotification } from "../notification/notification.actions"
import { updatePasswordSettings } from "../settings/settings.actions"

@connect((store) => ({
    password: store.passwordReducer.password,
    settings: store.settingsReducer.settings
}))
export class PasswordButtonsComponent extends React.Component {

    constructor(props) {
        super(props)
        this.copyPassword = this.copyPassword.bind(this)
        this.toggleSettings = this.toggleSettings.bind(this)
    }

    copyPassword() {
        const { password } = this.props
        copy(password)
        this.props.dispatch(sendNotification("Password copied to clipboard!"))
    }

    toggleSettings() {
        const { settings } = this.props
        this.props.dispatch(updatePasswordSettings({ advanced: !settings.advanced }))
    }

    render() {
        const { generatePassword } = this.props

        return [
            <div style={ passwordButtonsComponentStyle } key={ 1 }>
                <Button onClick={ generatePassword }
                        color="primary"
                        variant="contained"
                        style={ buttonStyle }
                        size={ "small" }
                >
                    <label style={ buttonLabelStyle }>Generate Password</label>
                </Button>
                <Button onClick={ this.copyPassword }
                        color="secondary"
                        variant="contained"
                        size={ "small" }
                        style={ copyPasswordButtonStyle }
                >
                    <label style={ buttonLabelStyle }>Copy Password</label>
                </Button>
            </div>,
            <div style={ { textAlign: "center" } } key={ 2 }>
                <Button onClick={ this.toggleSettings }
                        variant="contained"
                        size={ "small" }
                        style={ toggleButtonStyle }
                >
                    <label style={ buttonLabelStyle }>Toggle Settings</label>
                </Button>
            </div>
        ]
    }
}
