import {IconState} from "./icon/icon.state";
import {MessageState} from "./message/message.state";
import {AuthState} from "./auth/auth.state";

export interface AppState{
  iconState: IconState,
  messageState: MessageState,
  authState: AuthState
}
