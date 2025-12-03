import type { CLAIM_TYPES } from "@/utils/constants";

export interface JwtPayload {
    [CLAIM_TYPES.USER_ID]: string;
    [CLAIM_TYPES.USERNAME]: string;
    [CLAIM_TYPES.FIRST_NAME]?: string;
    [CLAIM_TYPES.LAST_NAME]?: string;
    [CLAIM_TYPES.ROLE_ID]?: string[];
    [CLAIM_TYPES.ROLE_NAME]?: string[];
    [CLAIM_TYPES.GROUP_ID]?: string[];
    [CLAIM_TYPES.GRPOUP_NAME]?: string[];
    [CLAIM_TYPES.EXPIRES_AT]: number;
}