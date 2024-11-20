
function funFunc(score: number, message?: string): string {
    return score + (message ?? "Null");
}

funFunc(4); //OPTIONAL PARAMETER
funFunc(4, "xd");
funFunc(4, "xd");



function sendGreeting(greeting: string = "Good morning"): string {
    return greeting;
}

sendGreeting();
sendGreeting("Good afternoon");



/// Handling undefined variables
let player: string|undefined = "Kai ris";

function logPlayer(name: string){ // requires type
    console.log("New game: "+name);
}

logPlayer(player);
