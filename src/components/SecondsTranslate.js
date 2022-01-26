export function getHours(seconds){
    let hours=Math.floor(seconds/3600)
    let minutes=(seconds%3600)/60
    return `${hours}${minutes==0?"":":"+minutes}`
}