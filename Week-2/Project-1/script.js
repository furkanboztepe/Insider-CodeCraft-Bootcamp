let name = prompt("Lütfen isminizi girin:");
let age = prompt("Lütfen yaşınızı girin");
let job = prompt("Lütfen mesleğinizi girin");

let userInfos = {
  name: name,
  age: age,
  job: job,
};
console.log("Kullanıcı Bilgileri: ", userInfos);

let cart = [];

function addProduct(name, price) {
  cart.push({ name: name, price: price });
  console.log(`${name} sepete eklendi. Fiyat: ${price}`);
}

function removeProduct(productName) {
  let lowerCaseProductName = productName.toLowerCase();
  let index = cart.findIndex(
    (product) => product.name.toLowerCase() === lowerCaseProductName
  );

  if (index !== -1) {
    let removedProduct = cart.splice(index, 1);
    console.log(`${removedProduct[0].name} sepetten çıkarıldı.`);
  } else {
    console.log(`${productName} sepette bulunamadı.`);
  }
}

function listCart() {
  console.log("Sepetiniz:");
  cart.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name} - ${product.price} TL`);
  });
}

function calculateTotal() {
  let totalPrice = cart.reduce((total, product) => total + product.price, 0);
  console.log("Sepetin Toplam Fiyatı:", totalPrice, "TL");
}

function mainMenu() {
  let choice = prompt(`Lütfen yapmak istediğiniz işlemi seçin:
1 - Ürün Ekle
2 - Ürün Çıkar
3 - Sepeti Listele
4 - Toplam Fiyatı Hesapla
5 - Çıkış`);

  switch (choice) {
    case "1":
      let productName = prompt("Eklemek istediğiniz ürünün adını girin:");
      let productPrice = parseFloat(
        prompt("Eklemek istediğiniz ürünün fiyatını girin:")
      );
      addProduct(productName, productPrice);
      break;

    case "2":
      let productToRemove = prompt("Çıkarmak istediğiniz ürünün adını girin:");
      removeProduct(productToRemove);
      break;

    case "3":
      listCart();
      break;

    case "4":
      calculateTotal();
      break;

    case "5":
      console.log("Çıkış yapılıyor...");
      return;

    default:
      console.log("Geçersiz seçim. Lütfen tekrar deneyin.");
      break;
  }
  mainMenu();
}
mainMenu();
