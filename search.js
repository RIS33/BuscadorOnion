const axios = require('axios');
const readline = require('readline');
const getUserInput = readline.createInterface({
  		input: process.stdin,
  		output: process.stdout
});

const main =  (query) => {
   axios.get('https://darksearch.io/api/search', { params: { query, page} })

  .then(response => {
    const {current_page,last_page} = response.data;
    
    response.data.data.forEach(item => {
      console.log(`[*] WebSite Title: ${item['title']}`);
      console.log(`[*] Link: ${item['link']}\n\n`);
    });
  
    console.log(`[*] Current Page: ${current_page}`);
    console.log(`[*] Last page: ${last_page}\n`);

	getUserInput.question('Next page ? (Y/n): ', (answer) => {
  		if (answer.toUpperCase() === 'Y') {
  			page++
  			main(keyword, page)
  		} else {
  			console.log("[*] Exiting...");
  			process.exit(1);
  		}
	});
  })
  .catch( error => {
    console.log("[*] There has been an error, perhaps you have not passed the options in the right way");
    console.log("[*] Exiting...");
    process.exit(1);
  });
}

const keyword = process.argv[2];
let page = 1;

main(keyword, page);
