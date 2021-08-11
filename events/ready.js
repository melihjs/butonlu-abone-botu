module.exports = {
    name: "ready",
    async execute(client) {
        console.log('Abone botu açıldı!');
        client.user.setPresence({
            activity: {
                name: `${client.config.prefix}yardım`,
                type: "COMPETING"
            },
            status: "idle"
        });
    }
}