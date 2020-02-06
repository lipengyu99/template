import {} from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles,route) {
    if (route.meta && route.meta.roles){
        return roles.some(role=>route.meta.roles.includes(role))
    }else{
        return true
    }
}