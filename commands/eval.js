exports.run = async(client , message ,args ) => {
    const o = ["580381333914648579", "857958962904694836"];
    if(!o.includes(message.author.id))return;
            const content = message.content.split(" ").slice(1).join(" ");
            const result = new Promise((resolve, reject) => resolve(eval(content)));
            
            return result.then((output) => {
                if(typeof output !== "string"){
                    output = require("util").inspect(output, { depth: 0 });
                }
                if(output.includes(message.client.token)){
                    output = output.replace(message.client.token, "T0K3N");
                }
                message.channel.send(output, {
                    code: "js"
                });
            }).catch((err) => {
                err = err.toString();
                if(err.includes(message.client.token)){
                    err = err.replace(message.client.token, "T0K3N");
                }
                message.channel.send(err, {
                    code: "js"
                });
            });
    }
    
    exports.help = {
        name:"eval"
    }