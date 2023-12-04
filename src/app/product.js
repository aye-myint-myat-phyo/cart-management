import { products } from "../core/data";
import {
  app,
  cartBtn,
  cartGroup,
  costTotal,
  fillStarTemplate,
  productGroup,
  productTemplate,
} from "../core/selectors";
import { cartUi } from "./cart";

export const starRating = (rate) => {
  const stars = document.createDocumentFragment();

  for (let i = 1; i <= 5; i++) {
    const fillStar = fillStarTemplate.content.cloneNode(true);
    const outlineStar = outlineStarTemplate.content.cloneNode(true);
    if (i <= rate.toFixed(0)) {
      stars.append(fillStar);
    } else {
      stars.append(outlineStar);
    }
  }
  return stars;
};

export const productUi = ({
  id,
  title,
  image,
  description,
  price,
  rating: { rate, count },
}) => {
  const product = productTemplate.content.cloneNode(true);
  product.querySelector(".product-card").setAttribute("product-card-id", id);
  product.querySelector(".product-img").src = image;
  product.querySelector(".product-title").innerText = title;
  product.querySelector(".product-description").innerText = description;
  product.querySelector(".product-price").innerText = price;
  product.querySelector(".product-rate").innerText = rate;
  product.querySelector(".product-count").innerText = count;
  product.querySelector(".product-stars").append(starRating(rate));

  if (cartGroup.querySelector(`[product-in-cart-id='${id}']`)) {
    product.querySelector(".add-to-cart-btn").toggleAttribute("disabled");
  }

  return product;
};

export const productRender = (lists) => {
  productGroup.innerHTML = "";
  lists.forEach((list) => productGroup.append(productUi(list)));
};

export const addToCart = (id) => {
  const currentProductCard = productGroup.querySelector(
    `[product-card-id='${id}']`
  );

  const img = currentProductCard.querySelector(".product-img");
  const imgInfo = img.getBoundingClientRect();
  const cartBtnInfo = cartBtn.getBoundingClientRect();
  console.log(cartBtnInfo);

  const newImg = img.cloneNode(true);
  newImg.classList.add("fixed");
  newImg.classList.remove("ml-5");
  newImg.style.top = imgInfo.top + "px";
  newImg.style.left = imgInfo.left + "px";
  app.append(newImg);

  const animationKeyFrame = [
    {
      top: imgInfo.top + "px",
      left: imgInfo.left + "px",
    },
    {
      top: cartBtnInfo.top + "px",
      left: cartBtnInfo.left + "px",
      height : 10 + "px",
      rotate : 3 + "turn",
    },
  ];
  const animationOptions = {
    duration: 500,
    iterations: 1,
  };

  const imgAnimation = newImg.animate(animationKeyFrame, animationOptions);

  imgAnimation.addEventListener("finish", () => {
    console.log("finish");
    newImg.remove();
    cartBtn.classList.add("animate__animated", "animate__tada");
    cartBtn.addEventListener("animationend", () => {
      cartBtn.classList.remove("animate__tada");
    });
    currentProductCard
      .querySelector(".add-to-cart-btn")
      .toggleAttribute("disabled");

    const currentProduct = products.find(
      (product) => product.id === parseInt(id)
    );
    cartGroup.append(cartUi(currentProduct));
  });

  // const newImg = new Image();
  // newImg.src = currentProductCard.querySelector(".product-img").src;
  // console.log(newImg);
};

export const productGroupHandler = (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    addToCart(
      event.target.closest(".product-card").getAttribute("product-card-id")
    );
  }
};
