const chave = "154dc50f35f42aa4971a7a3fb49ddc78";

async function buscar() {
    const cidade = document.getElementById("cidade").value.trim();
    const resDiv = document.getElementById("resultado");

    if (!cidade) {
        resDiv.innerHTML = "Por favor, digite o nome de uma cidade.";
        return;
    }

    resDiv.innerHTML = "A carregar...";

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${chave}&units=metric&lang=pt_br`;
        const resposta = await fetch(url);
        
        if (!resposta.ok) {
            throw new Error("Cidade não encontrada");
        }

        const dados = await resposta.json();
        
        resDiv.innerHTML = `
            <h3>${dados.name}, ${dados.sys.country}</h3>
            <img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png" alt="Ícone">
            <p><b>${Math.round(dados.main.temp)}°C</b> - ${dados.weather[0].description}</p>
            <p>Sensação: ${Math.round(dados.main.feels_like)}°C</p>
            <p>Humidade: ${dados.main.humidity}%</p>
        `;
    } catch (erro) {
        resDiv.innerHTML = "Erro: Cidade não encontrada ou chave inválida.";
    }
}