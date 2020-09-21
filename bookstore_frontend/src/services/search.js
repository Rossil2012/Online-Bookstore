export default function search(data, type, keyword) {
    return data.filter((ite) => {
        return ite[type].indexOf(keyword) !== -1;
    })
}