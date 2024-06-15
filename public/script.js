document.getElementById('searchButton').addEventListener('click', () => {
  const category = document.getElementById('searchInput').value.trim();
  if (!category) {
    alert('Veuillez entrer une catégorie.');
    return;
  }

  fetch(`/products/${category}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // Clear previous results
      if (data.length === 0) {
        resultsDiv.innerHTML = '<p>Aucun produit trouvé dans cette catégorie.</p>';
      } else {
        data.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.className = 'product';
          productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <p>Prix: ${product.price}</p>
            <p>Catégorie: ${product.category}</p>
          `;
          resultsDiv.appendChild(productDiv);
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('results').innerHTML = '<p>Erreur lors de la récupération des produits.</p>';
    });
});
