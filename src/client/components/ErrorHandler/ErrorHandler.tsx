import { FC } from "react";

import NoChannel from "./NoChannel";
import SomethingWentWrong from "./SomethingWentWrong";

const ErrorHandler: FC<{ error: Error$OAuthError; type?: string }> = ({ error, type = "" }) => {
    if (error.error.status === "NOCHANNEL" || error.error.message.includes("Channel not found")) {
        return <NoChannel error={error} type={type} />;
    } else if (error) {
        return <SomethingWentWrong error={error} />;
    } else {
        return <SomethingWentWrong />;
    }
};

export default ErrorHandler;
