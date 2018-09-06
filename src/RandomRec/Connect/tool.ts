import { Fusion } from "react-redux-actor";
import { RandomRec } from "../Actor/RandomRecActor";

export const M = Fusion(RandomRec.getStore());
