//====================================================
// THE COCOON ORIGINAL VIETNAM
// script.js
// Complete Combined Production Code
//====================================================

document.addEventListener("DOMContentLoaded", () => {

    function showToast(message){
        const toastBox = document.getElementById("toast");
        if(!toastBox) return;

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = message;
        toastBox.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = "slideOut .4s forwards";
            setTimeout(() => {
                toast.remove();
            },400);
        },2500);
    }

    //=====================================
    // LOADING
    //=====================================
    const loader = document.getElementById("loader");
    if(loader) {
        setTimeout(()=>{
            loader.classList.add("loader-hide");
        },1200);
    }
        
    //================================================
    // HERO SLIDER
    //================================================
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let currentSlide = 0;
    let autoSlide;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        if(slides[index]) slides[index].classList.add("active");
        if(dots[index]) dots[index].classList.add("active");
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    }

    function startSlider() {
        if(slides.length > 0) {
            autoSlide = setInterval(nextSlide, 5000);
        }
    }

    function stopSlider() {
        clearInterval(autoSlide);
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
        startSlider();

        nextBtn?.addEventListener("click", () => {
            stopSlider();
            nextSlide();
            startSlider();
        });

        prevBtn?.addEventListener("click", () => {
            stopSlider();
            prevSlide();
            startSlider();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                stopSlider();
                currentSlide = index;
                showSlide(currentSlide);
                startSlider();
            });
        });
    }

    //================================================
    // ACTIVE MENU
    //================================================
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-items a");

    navLinks.forEach(link => {
        const page = link.getAttribute("href");
        if (page === currentPage || (currentPage === "" && page === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
        
    //================================================
    // BACK TO TOP
    //================================================
    const backTop = document.querySelector(".back-top") || document.querySelector(".scroll-top");

    if (backTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backTop.style.display = "flex";
            } else {
                backTop.style.display = "none";
            }
        });

        backTop.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    //================================================
    // HEADER EFFECT
    //================================================
    const header = document.querySelector(".header-new");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 60) {
                header.style.boxShadow = "0 8px 25px rgba(0,0,0,.12)";
            } else {
                header.style.boxShadow = "none";
            }
        });
    }

    //================================================
    // SCROLL ANIMATION
    //================================================
    const animateItems = document.querySelectorAll(
        ".category-card, .product-card, .product-item, .why-card, .commitment-card, .tips-card, .news-card, .review-item"
    );

    if (animateItems.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }
                });
            },
            { threshold: 0.15 }
        );

        animateItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(40px)";
            item.style.transition = ".6s ease";
            observer.observe(item);
        });
    }
//================================================
    // SMOOTH SCROLL FOR ANCHOR (ĐÃ SỬA LỖI LAG CHUYỂN TRANG)
    //================================================
    const smoothLinks = document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const hrefAttr = this.getAttribute("href");
            
            // Nếu chỉ là dấu "#" trống hoặc link chuyển trang (.html) thì bỏ qua không chặn hiệu ứng
            if (hrefAttr === "#" || hrefAttr.includes(".html")) return;
            
            try {
                const target = document.querySelector(hrefAttr);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth" });
                }
            } catch (error) {
                // Tránh lỗi script nếu lỡ bấm vào ký tự đặc biệt
                console.log("Smooth scroll bypass");
            }
        });
    });
        
    //================================================
    // PRODUCT BUTTONS (ADD TO CART)
    //================================================
    const cartBadge = document.querySelector(".badge") || document.querySelector(".header-actions .action-btn .badge");
    let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }

    const cartButtons = document.querySelectorAll(".cart-btn, .product-card button, .product-item button");

    cartButtons.forEach(button => {
        if (button.hasAttribute('disabled') || button.closest('.out-stock')) return;

        button.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            cartCount++;
            if (cartBadge) {
                cartBadge.textContent = cartCount;
            }

            localStorage.setItem("cartCount", cartCount);

            this.style.transform = "scale(.9)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 150);

            showToast("🛒 Đã thêm sản phẩm vào giỏ hàng!");
        });
    });

    //================================================
    // BUY / DETAIL BUTTON HOVER EFFECT
    //================================================
    const detailButtons = document.querySelectorAll(".btn, .btn-detail, .view-btn");

    detailButtons.forEach(btn=>{
        btn.addEventListener("mouseenter", function(){
            this.style.transform="translateY(-3px)";
        });
        btn.addEventListener("mouseleave", function(){
            this.style.transform="translateY(0)";
        });
    });

    //================================================
    // PRODUCT CARD & CATEGORY HOVER BOX-SHADOW
    //================================================
    const productCards = document.querySelectorAll(".product-card, .product-item");
    productCards.forEach(card=>{
        card.addEventListener("mouseenter",()=>{
            card.style.boxShadow="0 18px 40px rgba(0,0,0,.15)";
        });
        card.addEventListener("mouseleave",()=>{
            card.style.boxShadow="0 5px 15px rgba(0,0,0,.08)";
        });
    });

    //================================================
    // NEWSLETTER FORM SUBMIT
    //================================================
    const newsletter = document.querySelector(".newsletter-form");

    if(newsletter){
        newsletter.addEventListener("submit",function(e){
            e.preventDefault();
            const email = this.querySelector("input");

            if(!email || email.value.trim() == ""){
                showToast("⚠️ Vui lòng nhập Email!");
                if(email) email.focus();
                return;
            }

            showToast("🎉 Đăng ký nhận ưu đãi thành công!");
            this.reset();
        });
    }

    //================================================
    // BUTTON GLOBAL RIPPLE / SCALE EFFECT
    //================================================
    const globalButtons = document.querySelectorAll("button, .btn, .view-btn, .btn-detail");

    globalButtons.forEach(button=>{
        button.addEventListener("mousedown", function(){
            this.style.transform="scale(.96)";
        });
        button.addEventListener("mouseup", function(){
            this.style.transform="scale(1)";
        });
        button.addEventListener("mouseleave", function(){
            this.style.transform="scale(1)";
        });
    });
        
    //================================================
    // GLOBAL HEADER SEARCH PRODUCT (NÂNG CẤP THÔNG MINH)
    //================================================
    const gInput = document.getElementById("globalSearchInput");
    const gBtn = document.getElementById("globalSearchBtn");

    function runGlobalSearch() {
        if (!gInput) return;
        const keyword = gInput.value.toLowerCase().trim();
        if (keyword === "") return;

        // XỬ LÝ CHUYỂN TRANG ĐẶC BIỆT KHI GÕ TỪ KHÓA
        if (keyword.includes("thương hiệu") || keyword.includes("brand") || keyword === "about") {
            window.location.href = "about.html";
            return;
        }
        if (keyword.includes("review") || keyword.includes("đánh giá")) {
            window.location.href = "review.html";
            return;
        }
        if (keyword.includes("liên hệ") || keyword.includes("contact")) {
            window.location.href = "contact.html";
            return;
        }
        if (keyword.includes("giỏ hàng") || keyword === "cart") {
            window.location.href = "cart.html";
            return;
        }
        if (keyword.includes("tin tức") || keyword === "news") {
            window.location.href = "news.html";
            return;
        }
        if (keyword.includes("bí quyết") || keyword === "tips") {
            window.location.href = "tips.html";
            return;
        }

        // NẾU LÀ TỪ KHÓA BÌNH THƯỜNG -> LỌC SẢN PHẨM TRÊN TRANG
        const products = document.querySelectorAll(".product-card, .product-item");
        let hasProduct = false;

        products.forEach(product => {
            const name = product.querySelector("h3");
            if (!name) return;

            if (name.textContent.toLowerCase().includes(keyword)) {
                product.style.display = ""; 
                hasProduct = true;
            } else {
                product.style.display = "none"; 
            }
        });

        // Nếu đang ở trang khác mà gõ tên sản phẩm, tự động chuyển về trang Sản phẩm để tìm
        if (!hasProduct && (currentPage !== "products.html" && currentPage !== "index.html")) {
            window.location.href = "products.html";
        }
    }

    // Bắt sự kiện khi gõ và ấn phím Enter
    if (gInput) {
        gInput.addEventListener("keyup", function (e) {
            if (e.key === "Enter") {
                runGlobalSearch();
            }
        });
    }

    // Bắt sự kiện khi click vào nút kính lúp
    if (gBtn) {
        gBtn.addEventListener("click", function (e) {
            runGlobalSearch();
        });
    }

    //==================================================
    // BỘ LỌC VÀ TÌM KIẾM CHO TRANG PRODUCTS.HTML
    //==================================================
    const pInput = document.getElementById("productSearchInput");
    const cSelect = document.getElementById("categorySelect");

    function filterProducts() {
        const keyword = pInput ? pInput.value.toLowerCase().trim() : "";
        const category = cSelect ? cSelect.value : "all";
        const innerProducts = document.querySelectorAll(".product-card, .product-item");

        innerProducts.forEach(card => {
            const nameText = card.querySelector("h3")?.textContent.toLowerCase() || "";
            const cardCategory = card.getAttribute("data-category") || "";

            const matchesKeyword = nameText.includes(keyword);
            const matchesCategory = (category === "all" || cardCategory === category);

            if (matchesKeyword && matchesCategory) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }

    if (pInput) pInput.addEventListener("input", filterProducts);
    if (cSelect) cSelect.addEventListener("change", filterProducts);

    //================================================
    // BỔ SUNG QUAN TRỌNG: BỘ ĐIỀU KHIỂN TĂNG / GIẢM / XÓA SẢN PHẨM TRONG GIỎ HÀNG
    //================================================
    
    function updateCartTotals() {
        const subtotalElement = document.getElementById("cart-subtotal");
        const totalElement = document.getElementById("cart-total");
        if (!subtotalElement || !totalElement) return;

        let totalMoney = 0;
        // Quét qua tất cả sản phẩm còn sót lại trong giỏ hàng
        const remainingItems = document.querySelectorAll(".cart-item");

        remainingItems.forEach(item => {
            // Lấy giá tiền (Xóa chữ "đ" và dấu chấm để chuyển về số)
            const priceText = item.querySelector("p")?.textContent || "0";
            const price = parseInt(priceText.replace(/[^0-9]/g, ""));
            
            // Lấy số lượng hiện tại
            const qtyElement = item.querySelector(".qty-val");
            const qty = qtyElement ? parseInt(qtyElement.textContent) : 1;

            totalMoney += price * qty;
        });

        // Định dạng lại tiền thành chuỗi có dấu chấm (Ví dụ: 152000 -> 152.000đ)
        const formattedPrice = totalMoney.toLocaleString('vi-VN') + "đ";
        
        // Cập nhật lên màn hình hộp tóm tắt đơn hàng
        subtotalElement.textContent = formattedPrice;
        totalElement.textContent = formattedPrice;

        // Nếu giỏ hàng trống hoàn toàn, hiển thị dòng chữ thông báo
        const container = document.getElementById("cart-container");
        if (remainingItems.length === 0 && container) {
            container.innerHTML = `<div style="text-align:center; padding: 30px; color: #888;">
                <i class="fa-solid fa-basket-shopping" style="font-size: 40px; margin-bottom: 10px; color: #ccc;"></i>
                <p>Giỏ hàng của bạn đang trống!</p>
            </div>`;
        }
    }

    // 1. Xử lý nút Xóa (Thùng rác)
    const deleteButtons = document.querySelectorAll(".btn-delete-item");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const cartItem = this.closest(".cart-item");
            if (cartItem) {
                // Đọc số lượng hiện tại của phần tử này trước khi xóa hẳn
                const qtyElement = cartItem.querySelector(".qty-val");
                const itemQty = qtyElement ? parseInt(qtyElement.textContent) : 1;

                // Xóa bóc tách giao diện thẻ trên màn hình
                cartItem.remove();

                // Trừ tổng số lượng lưu trong bộ nhớ Badge hệ thống
                cartCount = cartCount - itemQty;
                if (cartCount < 0) cartCount = 0;

                localStorage.setItem("cartCount", cartCount);
                if (cartBadge) cartBadge.textContent = cartCount;

                // ĐÃ SỬA: Gọi lại hàm để tính lại tiền về 0đ khi xóa hết hàng
                updateCartTotals();

                showToast("🗑️ Đã xóa sản phẩm khỏi giỏ hàng!");
            }
        });
    });

    // 2. Xử lý giảm số lượng (-)
    const minusButtons = document.querySelectorAll(".btn-minus");
    minusButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const qtyElement = this.parentElement.querySelector(".qty-val");
            if (qtyElement) {
                let qty = parseInt(qtyElement.textContent);
                if (qty > 1) {
                    qty--;
                    qtyElement.textContent = qty;

                    cartCount--;
                    if (cartCount < 0) cartCount = 0;
                    localStorage.setItem("cartCount", cartCount);
                    if (cartBadge) cartBadge.textContent = cartCount;

                    // ĐÃ SỬA: Gọi lại hàm để tự động trừ bớt tiền khi giảm số lượng
                    updateCartTotals();
                }
            }
        });
    });

    // 3. Xử lý tăng số lượng (+)
    const plusQtyButtons = document.querySelectorAll(".btn-plus-qty");
    plusQtyButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const qtyElement = this.parentElement.querySelector(".qty-val");
            if (qtyElement) {
                let qty = parseInt(qtyElement.textContent);
                qty++;
                qtyElement.textContent = qty;

                cartCount++;
                localStorage.setItem("cartCount", cartCount);
                if (cartBadge) cartBadge.textContent = cartCount;

                // ĐÃ SỬA: Gọi lại hàm để tự động cộng thêm tiền khi tăng số lượng
                updateCartTotals();
            }
        });
    });
    //================================================
    // IMAGE LOADING EFFECT & CURRENT YEAR
    //================================================
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        img.addEventListener("load", function () {
            this.style.opacity = "1";
        });
    });

    const year = document.querySelector(".current-year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

});