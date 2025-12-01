import { getCookie } from "@wotu/wotu-components";

// 演示个人站点
export const isPersonDemo = ['enx', 'ezjs'].includes(getCookie('ALIAS'))
// 演示机构
export const isDemo = ['ORG2209221ETE0VB4', 'ORG16710331TCI7JPC'].includes(getCookie('SELECT_ORG_CODE')) || (BUILD_ENV === "test" && isPersonDemo)