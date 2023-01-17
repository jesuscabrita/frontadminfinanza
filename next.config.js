module.exports = () => {
    const rewrites = () => {
        return [
            {
                source: "/dolarblue",
                destination: "https://api-dolar-argentina.herokuapp.com/api/dolarblue",
            },{
                source: "/dolaroficial",
                destination: "https://api-dolar-argentina.herokuapp.com/api/dolaroficial",
            },{
                source: "/apiriesgopais",
                destination: "https://api-dolar-argentina.herokuapp.com/api/riesgopais",
            },{
                source: "/apievoluciondolarblue",
                destination: "https://api-dolar-argentina.herokuapp.com/api/evolucion/dolarblue",
            },{
                source: "/apinoticias",
                destination: "https://newsapi.org/v2/",
            }
        ];
    };
    return {
        rewrites,
    };
};
