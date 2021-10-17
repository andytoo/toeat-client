export default {
    makeId(length) {
        var id = ""
        const charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for (var i = 0; i < length; i++) {
            id += charList.charAt(Math.floor(Math.random() * charList.length))
        }
        return id
    }
}