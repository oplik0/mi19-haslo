self.addEventListener("activate", async (event) => {
    const bc = new BroadcastChannel("test_channel");
    bc.addEventListener("message", async (event) => {
        await fetch("http://localhost:8080/broadcast");
    });
});
