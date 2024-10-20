import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    
    name : 'amplify-RVC-storage',
    access: (allow) => ({
        "product-images/*": [
            allow.guest.to(["read"]),
            allow.authenticated.to(["read"]),
            allow.groups(["admins"]).to (["read", "write", "delete"]),
        ]
    })

});