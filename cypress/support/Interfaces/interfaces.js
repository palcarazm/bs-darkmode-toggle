class Interfaces {
    static interfaces = Object.freeze(["ecmas", "jquery"]);

    static forEach(callback) {
        this.interfaces.forEach((pluginInterface) => {
            context(
                `Given ${pluginInterface.toUpperCase()} plugin interface`,
                () => {
                    callback(pluginInterface);
                }
            );
        });
    }
}

export default Interfaces;
