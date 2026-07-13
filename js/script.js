console.log("File script.js đã được tải thành công!");
document.addEventListener("DOMContentLoaded", () => {
    function showToast(message) {
        const toastBox = document.getElementById("toast");
        if (!toastBox) return;
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = message;
        toastBox.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = "slideOut .4s forwards";
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    }
    window.showToast = showToast;

    const userText = document.getElementById("userAccountText");
    if (userText && localStorage.getItem("isLoggedIn") === "true") {
    userText.innerText = localStorage.getItem("userName") || "Tài khoản";
    }
	
    window.checkLogin = function() {
        if (localStorage.getItem("isLoggedIn") === "true") {
            window.location.href = "profile.html";
        } else {
            window.location.href = "login.html";
        }
    };

    window.logout = function() {
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "index.html";
    };
    
    const loginForm = document.getElementById("loginForm");

	if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
		
		const email = document.getElementById("emailInput").value;
        const name = document.getElementById("nameInput").value;
		localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", name);
        window.location.href = "profile.html";
        });
    }

    const toggleBtn = document.getElementById("toggleBtn");
    const cocoonText = document.getElementById("cocoonText");
    if (toggleBtn && cocoonText) {
        toggleBtn.addEventListener("click", function () {
            cocoonText.classList.toggle("show");
            cocoonText.classList.toggle("collapsed");
            toggleBtn.innerHTML = cocoonText.classList.contains("show") ? "Thu gọn nội dung" : "Xem thêm nội dung";
        });
    }

});
document.addEventListener("DOMContentLoaded", () => {

    function showToast(message) {
        const toastBox = document.getElementById("toast");
        if (!toastBox) return;

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = message;
        toastBox.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = "slideOut .4s forwards";
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    }

    window.showToast = showToast;

    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("loader-hide");
        }, 1200);
    }

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    let currentSlide = 0;
    let autoSlide;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        if (slides[index]) slides[index].classList.add("active");
        if (dots[index]) dots[index].classList.add("active");
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        if (slides.length > 0) {
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


    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-items a");

    navLinks.forEach(link => {
        const page = link.getAttribute("href");
        if (page === currentPage || (currentPage === "" && page === "index.html")) {
            link.classList.add("active");
        }
    });


    const header = document.querySelector(".header-new");
    if (header) {
        window.addEventListener("scroll", () => {
            header.style.boxShadow = window.scrollY > 60 
                ? "0 8px 25px rgba(0,0,0,.12)" 
                : "none";
        });
    }


    const backTop = document.querySelector(".back-top");
    if (backTop) {
        window.addEventListener("scroll", () => {
            backTop.style.display = window.scrollY > 300 ? "flex" : "none";
        });

        backTop.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    const animateItems = document.querySelectorAll(
        ".category-card, .product-card, .product-item, .why-card, " +
        ".commitment-card, .tips-card, .news-card, .review-item"
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


    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const hrefAttr = this.getAttribute("href");
            if (hrefAttr === "#" || hrefAttr.includes(".html")) return;

            try {
                const target = document.querySelector(hrefAttr);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth" });
                }
            } catch (error) {
                console.log("Smooth scroll error");
            }
        });
    });

    const cartBadge = document.querySelector(".badge");
    let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }

    function updateCartCount(delta) {
        cartCount = Math.max(0, cartCount + delta);
        if (cartBadge) cartBadge.textContent = cartCount;
        localStorage.setItem("cartCount", cartCount);
    }

    const cartButtons = document.querySelectorAll(".cart-btn, .product-card button, .product-item button");
    cartButtons.forEach(button => {
        if (button.hasAttribute('disabled') || button.closest('.out-stock')) return;
button.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const product = this.closest(".product-card, .product-item");

    const name = product.querySelector("h3").innerText;
    const price = product.querySelector(".price").innerText;
    const image = product.querySelector("img").src;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const index = cart.findIndex(item => item.name === name);

if (index !== -1) {
    cart[index].quantity++;
} else {
    cart.push({
        name,
        price,
        image,
        quantity: 1
    });
}

localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(1);

    this.style.transform = "scale(.9)";
    setTimeout(() => {
        this.style.transform = "scale(1)";
    }, 150);

    showToast("🛒 Đã thêm sản phẩm vào giỏ hàng!");
	});
  });


    const detailButtons = document.querySelectorAll(".btn, .btn-detail");
    detailButtons.forEach(btn => {
        btn.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-3px)";
        });
        btn.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });

    const productCards = document.querySelectorAll(".product-card, .product-item");
    productCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 18px 40px rgba(0,0,0,.15)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "0 5px 15px rgba(0,0,0,.08)";
        });
    });

		 const newsletter = document.querySelector(".newsletter-form");
		if (newsletter) {
			newsletter.addEventListener("submit", function (e) {
				e.preventDefault();
				const email = this.querySelector("input");

				
				if (!email || email.value.trim() === "") {
					showToast("⚠️ Vui lòng nhập Email!");
					email?.focus();
					return;
				}

				showToast("🎉 Đăng ký nhận ưu đãi thành công!");
				
			
				this.reset(); 
				
				
				email.blur(); 
			});
		}
    const gInput = document.getElementById("globalSearchInput");
    const gBtn = document.getElementById("globalSearchBtn");

    function runGlobalSearch() {
        if (!gInput) return;
        const keyword = gInput.value.toLowerCase().trim();
        if (!keyword) return;

        const pageMap = {
            "thương hiệu": "about.html",
            "brand": "about.html",
            "about": "about.html",
            "review": "review.html",
            "đánh giá": "review.html",
            "liên hệ": "contact.html",
            "contact": "contact.html",
            "giỏ hàng": "cart.html",
            "cart": "cart.html",
            "tin tức": "news.html",
            "news": "news.html",
            "bí quyết": "tips.html",
            "tips": "tips.html"
        };

        for (const [key, page] of Object.entries(pageMap)) {
            if (keyword.includes(key)) {
                window.location.href = page;
                return;
            }
        }

        const products = document.querySelectorAll(".product-card, .product-item");
        let hasMatch = false;

        products.forEach(product => {
            const name = product.querySelector("h3");
            if (!name) return;

            if (name.textContent.toLowerCase().includes(keyword)) {
                product.style.display = "";
                hasMatch = true;
            } else {
                product.style.display = "none";
            }
        });

        if (!hasMatch && currentPage !== "products.html") {
            window.location.href = "products.html";
        }
    }

    if (gInput) {
        gInput.addEventListener("keyup", function (e) {
            if (e.key === "Enter") runGlobalSearch();
        });
    }

    if (gBtn) {
        gBtn.addEventListener("click", runGlobalSearch);
    }

  
    const pInput = document.getElementById("productSearchInput");
    const cSelect = document.getElementById("categorySelect");

    function filterProducts() {
        const keyword = pInput?.value.toLowerCase().trim() || "";
        const category = cSelect?.value || "all";
        const items = document.querySelectorAll(".product-card, .product-item");

        items.forEach(item => {
            const name = item.querySelector("h3")?.textContent.toLowerCase() || "";
            const itemCategory = item.getAttribute("data-category") || "";

            const matchKeyword = name.includes(keyword);
            const matchCategory = category === "all" || itemCategory === category;

            item.style.display = (matchKeyword && matchCategory) ? "" : "none";
        });
    }

    if (pInput) pInput.addEventListener("input", filterProducts);
    if (cSelect) cSelect.addEventListener("change", filterProducts);


    function updateCartTotals() {
        const subtotalElement = document.getElementById("cart-subtotal");
        const totalElement = document.getElementById("cart-total");
        if (!subtotalElement || !totalElement) return;

        let totalMoney = 0;
        const items = document.querySelectorAll(".cart-item");

        items.forEach(item => {
            const priceText = item.querySelector("p")?.textContent || "0";
            const price = parseInt(priceText.replace(/[^0-9]/g, ""));
            const qtyElement = item.querySelector(".qty-val");
            const qty = qtyElement ? parseInt(qtyElement.textContent) : 1;
            totalMoney += price * qty;
        });

        const formatted = totalMoney.toLocaleString('vi-VN') + "đ";
        subtotalElement.textContent = formatted;
        totalElement.textContent = formatted;

        const container = document.getElementById("cart-container");
        if (items.length === 0 && container) {
            container.innerHTML = `
                <div style="text-align:center; padding:40px 0; color:#777;">
                    <i class="fa-solid fa-basket-shopping" style="font-size:48px; margin-bottom:15px; color:#ccc;"></i>
                    <p style="font-size:16px; font-weight:500;">Giỏ hàng của bạn đang trống.</p>
                </div>
            `;
        }
    }


    document.querySelectorAll(".btn-delete-item").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const item = this.closest(".cart-item");
            if (item) {
                const qty = parseInt(item.querySelector(".qty-val")?.textContent) || 1;
                item.remove();
                updateCartCount(-qty);
                updateCartTotals();
                showToast("🗑️ Đã xóa sản phẩm khỏi giỏ hàng!");
            }
        });
    });

 
    document.querySelectorAll(".btn-minus").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const qtyElement = this.parentElement.querySelector(".qty-val");
            if (qtyElement) {
                let qty = parseInt(qtyElement.textContent);
                if (qty > 1) {
                    qty--;
                    qtyElement.textContent = qty;
                    updateCartCount(-1);
                    updateCartTotals();
                }
            }
        });
    });


    document.querySelectorAll(".btn-plus-qty").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const qtyElement = this.parentElement.querySelector(".qty-val");
            if (qtyElement) {
                let qty = parseInt(qtyElement.textContent);
                qty++;
                qtyElement.textContent = qty;
                updateCartCount(1);
                updateCartTotals();
            }
        });
    });

    const productDetails = {
        "Gel bí đao rửa mặt 310ml": {
			price: "199.000đ",
			oldPrice: "299.000đ",
			rating: "★★★★★",
			reviews: "255 đánh giá",
			description: `
				<h4>Mô tả sản phẩm</h4>
				<p>Gel rửa mặt Bí Đao Cocoon giúp làm sạch bụi bẩn, bã nhờn và lớp trang điểm nhẹ trên da mà không gây khô căng. Công thức dịu nhẹ phù hợp cho làn da dầu và da mụn.</p>

				<h4>Công dụng</h4>
				<ul>
					<li>Làm sạch sâu lỗ chân lông.</li>
					<li>Giảm dầu thừa và hỗ trợ ngăn ngừa mụn.</li>
					<li>Duy trì độ ẩm tự nhiên cho da.</li>
					<li>Giúp da mềm mại và tươi mát.</li>
				</ul>

				<h4>Thành phần nổi bật</h4>
				<ul>
					<li>Chiết xuất Bí Đao.</li>
					<li>Tinh dầu Tràm Trà.</li>
					<li>Vitamin B3.</li>
				</ul>

				<h4>Loại da phù hợp</h4>
				<p>Da dầu, da hỗn hợp và da dễ nổi mụn.</p>
			`
		},

		"Nước bí đao cân bằng da 310ml": {
			price: "199.000đ",
			oldPrice: "299.000đ",
			rating: "★★★★★",
			reviews: "300 đánh giá",
			description: `
				<h4>Mô tả sản phẩm</h4>
				<p>Nước cân bằng Bí Đao Cocoon giúp cân bằng độ pH sau khi rửa mặt, cấp ẩm nhẹ và hỗ trợ làm dịu làn da.</p>

				<h4>Công dụng</h4>
				<ul>
					<li>Cân bằng độ pH.</li>
					<li>Làm dịu da sau khi làm sạch.</li>
					<li>Hỗ trợ se khít lỗ chân lông.</li>
					<li>Chuẩn bị da cho các bước dưỡng tiếp theo.</li>
				</ul>

				<h4>Thành phần nổi bật</h4>
				<ul>
					<li>Chiết xuất Bí Đao.</li>
					<li>Rau Má.</li>
					<li>Betaine.</li>
				</ul>

				<h4>Loại da phù hợp</h4>
				<p>Da dầu, da hỗn hợp và da nhạy cảm.</p>
			`
		},

		"Tinh chất bí đao N15 70ml": {
			price: "386.000đ",
			oldPrice: "486.000đ",
			rating: "★★★★★",
			reviews: "355 đánh giá",
			description: `
				<h4>Mô tả sản phẩm</h4>
				<p>Tinh chất Bí Đao N15 hỗ trợ giảm mụn, giảm thâm sau mụn và cải thiện kết cấu da, mang lại làn da khỏe mạnh hơn.</p>

				<h4>Công dụng</h4>
				<ul>
					<li>Hỗ trợ giảm mụn.</li>
					<li>Làm mờ vết thâm.</li>
					<li>Kiểm soát bã nhờn.</li>
					<li>Cải thiện bề mặt da.</li>
				</ul>

				<h4>Thành phần nổi bật</h4>
				<ul>
					<li>Niacinamide.</li>
					<li>Chiết xuất Bí Đao.</li>
					<li>Panthenol.</li>
				</ul>

				<h4>Loại da phù hợp</h4>
				<p>Da dầu mụn và da hỗn hợp.</p>
			`
		},

		"Thạch nghệ Hưng Yên 100ml": {
			price: "278.000đ",
			oldPrice: "378.000đ",
			rating: "★★★★★",
			reviews: "245 đánh giá",
			description: `
				<h4>Mô tả sản phẩm</h4>
				<p>Thạch dưỡng Nghệ Hưng Yên giúp cấp ẩm, phục hồi và làm sáng làn da xỉn màu nhờ chiết xuất nghệ tự nhiên.</p>

				<h4>Công dụng</h4>
				<ul>
					<li>Dưỡng ẩm.</li>
					<li>Hỗ trợ phục hồi da.</li>
					<li>Làm sáng da.</li>
					<li>Giảm thâm sau mụn.</li>
				</ul>

				<h4>Thành phần nổi bật</h4>
				<ul>
					<li>Nghệ Hưng Yên.</li>
					<li>Vitamin E.</li>
					<li>Glycerin.</li>
				</ul>

				<h4>Loại da phù hợp</h4>
				<p>Mọi loại da.</p>
			`
		},

		"Mặt nạ bí đao 100ml": {
			price: "299.000đ",
			oldPrice: "339.000đ",
			rating: "★★★★★",
			reviews: "295 đánh giá",
			description: `
				<h4>Mô tả sản phẩm</h4>
				<p>Mặt nạ Bí Đao Cocoon giúp hút dầu thừa, làm sạch sâu và mang lại cảm giác mát dịu sau mỗi lần sử dụng.</p>

				<h4>Công dụng</h4>
				<ul>
					<li>Làm sạch sâu.</li>
					<li>Giảm dầu nhờn.</li>
					<li>Làm dịu da.</li>
					<li>Hỗ trợ ngăn ngừa mụn.</li>
				</ul>

				<h4>Thành phần nổi bật</h4>
				<ul>
					<li>Đất sét Kaolin.</li>
					<li>Chiết xuất Bí Đao.</li>
					<li>Tinh dầu Tràm Trà.</li>
				</ul>

				<h4>Loại da phù hợp</h4>
				<p>Da dầu và da hỗn hợp thiên dầu.</p>
			`
		},

		"Kem chống nắng bí đao 50ml": {
			price: "358.000đ",
			oldPrice: "388.000đ",
			rating: "★★★★★",
			reviews: "350 đánh giá",
			description: `
				<h4>Mô tả sản phẩm</h4>
				<p>Kem chống nắng Bí Đao Cocoon bảo vệ da trước tác hại của tia UVA và UVB, đồng thời giúp kiểm soát dầu hiệu quả.</p>

				<h4>Công dụng</h4>
				<ul>
					<li>Chống nắng phổ rộng.</li>
					<li>Kiểm soát dầu.</li>
					<li>Không gây bết dính.</li>
					<li>Bảo vệ da hằng ngày.</li>
				</ul>

				<h4>Thành phần nổi bật</h4>
				<ul>
					<li>Chiết xuất Bí Đao.</li>
					<li>Vitamin E.</li>
					<li>Các màng lọc UV thế hệ mới.</li>
				</ul>

				<h4>Loại da phù hợp</h4>
				<p>Mọi loại da, đặc biệt da dầu.</p>
			`
		},

		"Nước sen Hậu Giang 310ml": {
			price: "199.000đ",
			oldPrice: "299.000đ",
			rating: "★★★★★",
			reviews: "455 đánh giá",
			description: `
				<h4>Mô tả sản phẩm</h4>
				<p>Nước Sen Hậu Giang giúp cấp ẩm, làm mềm và mang lại cảm giác thư giãn cho làn da sau khi làm sạch.</p>

				<h4>Công dụng</h4>
				<ul>
					<li>Cấp nước tức thì.</li>
					<li>Làm dịu da.</li>
					<li>Giữ da mềm mại.</li>
					<li>Hỗ trợ dưỡng sáng.</li>
				</ul>

				<h4>Thành phần nổi bật</h4>
				<ul>
					<li>Chiết xuất Hoa Sen.</li>
					<li>Vitamin B5.</li>
					<li>Glycerin.</li>
				</ul>

				<h4>Loại da phù hợp</h4>
				<p>Mọi loại da.</p>
			`
		},

		"Mặt nạ nghệ Hưng Yên 100ml": {
			price: "299.000đ",
			oldPrice: "339.000đ",
			rating: "★★★★★",
			reviews: "310 đánh giá",
			description: `
				<h4>Mô tả sản phẩm</h4>
				<p>Mặt nạ Nghệ Hưng Yên giúp dưỡng sáng, phục hồi và giảm thâm sau mụn nhờ chiết xuất nghệ nguyên chất.</p>

				<h4>Công dụng</h4>
				<ul>
					<li>Dưỡng sáng da.</li>
					<li>Giảm thâm.</li>
					<li>Phục hồi da.</li>
					<li>Dưỡng ẩm nhẹ.</li>
				</ul>

				<h4>Thành phần nổi bật</h4>
				<ul>
					<li>Nghệ Hưng Yên.</li>
					<li>Vitamin E.</li>
					<li>Panthenol.</li>
				</ul>

				<h4>Loại da phù hợp</h4>
				<p>Da xỉn màu, da sau mụn.</p>
			`
		},
		
		"Sữa rửa mặt nghệ Hưng Yên 140ml": {
			price: "152.000đ",
			oldPrice: "192.000đ",
			rating: "★★★★★",
			reviews: "310 đánh giá",
			description: `
				<h4 style="color:#35542d;margin:15px 0;">Mô tả sản phẩm</h4>
				<p style="line-height:1.7;color:#666;">
					Sữa rửa mặt Nghệ Hưng Yên giúp làm sạch bụi bẩn và dầu thừa, đồng thời hỗ trợ làm sáng da,
					cải thiện các vết thâm sau mụn và mang lại làn da mềm mịn.
				</p>

				<h4 style="color:#35542d;margin:15px 0;">Thành phần nổi bật</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Chiết xuất nghệ Hưng Yên</li>
					<li>Vitamin B3</li>
					<li>Panthenol (Vitamin B5)</li>
					<li>Glycerin thực vật</li>
				</ul>

				<h4 style="color:#35542d;margin:15px 0;">Công dụng</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Làm sạch da.</li>
					<li>Giảm thâm.</li>
					<li>Dưỡng sáng.</li>
					<li>Giữ ẩm sau khi rửa.</li>
				</ul>
			`
		},
		
		"Dầu gội bưởi không sulfate 500ml": {
				price: "358.000đ",
				oldPrice: "388.000đ",
				rating: "★★★★★",
				reviews: "520 đánh giá",
				description: `
					<h4 style="color:#35542d;margin:15px 0;">Mô tả sản phẩm</h4>
					<p style="line-height:1.7;color:#666;">
						Dầu gội bưởi không sulfate Cocoon giúp làm sạch tóc và da đầu nhẹ nhàng,
						giảm gãy rụng, nuôi dưỡng tóc chắc khỏe và bóng mượt.
					</p>

					<h4 style="color:#35542d;margin:15px 0;">Thành phần nổi bật</h4>
					<ul style="padding-left:20px;color:#666;">
						<li>Tinh dầu bưởi</li>
						<li>Vitamin B5</li>
						<li>Protein thực vật</li>
						<li>Chiết xuất bồ kết</li>
					</ul>

					<h4 style="color:#35542d;margin:15px 0;">Công dụng</h4>
					<ul style="padding-left:20px;color:#666;">
						<li>Làm sạch da đầu.</li>
						<li>Giảm gãy rụng.</li>
						<li>Kích thích tóc chắc khỏe.</li>
						<li>Không chứa sulfate.</li>
					</ul>
				`
			},

			"Dầu xả bưởi 310ml": {
				price: "152.000đ",
				oldPrice: "192.000đ",
				rating: "★★★★★",
				reviews: "245 đánh giá",
				description: `
					<h4 style="color:#35542d;margin:15px 0;">Mô tả sản phẩm</h4>
					<p style="line-height:1.7;color:#666;">
						Dầu xả bưởi giúp phục hồi tóc khô xơ, tăng độ mềm mượt và giảm tình trạng tóc rối sau khi gội.
					</p>

					<h4 style="color:#35542d;margin:15px 0;">Thành phần nổi bật</h4>
					<ul style="padding-left:20px;color:#666;">
						<li>Tinh dầu bưởi</li>
						<li>Dầu argan</li>
						<li>Vitamin E</li>
						<li>Keratin thực vật</li>
					</ul>

					<h4 style="color:#35542d;margin:15px 0;">Công dụng</h4>
					<ul style="padding-left:20px;color:#666;">
						<li>Dưỡng tóc mềm mượt.</li>
						<li>Giảm xơ rối.</li>
						<li>Hỗ trợ phục hồi tóc hư tổn.</li>
						<li>Tăng độ bóng tự nhiên.</li>
					</ul>
				`
			},

			"Nước dưỡng tóc tinh dầu bưởi 140ml": {
				price: "152.000đ",
				oldPrice: "162.000đ",
				rating: "★★★★★",
				reviews: "225 đánh giá",
				description: `
					<h4 style="color:#35542d;margin:15px 0;">Mô tả sản phẩm</h4>
					<p style="line-height:1.7;color:#666;">
						Nước dưỡng tóc tinh dầu bưởi giúp nuôi dưỡng chân tóc, giảm gãy rụng,
						mang lại mái tóc dày và chắc khỏe hơn khi sử dụng thường xuyên.
					</p>

					<h4 style="color:#35542d;margin:15px 0;">Thành phần nổi bật</h4>
					<ul style="padding-left:20px;color:#666;">
						<li>Tinh dầu vỏ bưởi</li>
						<li>Vitamin B5</li>
						<li>Biotin</li>
						<li>Chiết xuất nha đam</li>
					</ul>

					<h4 style="color:#35542d;margin:15px 0;">Công dụng</h4>
					<ul style="padding-left:20px;color:#666;">
						<li>Giảm gãy rụng.</li>
						<li>Kích thích mọc tóc.</li>
						<li>Dưỡng tóc mềm mượt.</li>
						<li>Bảo vệ tóc khỏi hư tổn.</li>
					</ul>
				`
			},

			"Kem ủ tóc bưởi 200ml": {
				price: "192.000đ",
				oldPrice: "212.000đ",
				rating: "★★★★★",
				reviews: "205 đánh giá",
				description: `
					<h4 style="color:#35542d;margin:15px 0;">Mô tả sản phẩm</h4>
					<p style="line-height:1.7;color:#666;">
						Kem ủ tóc bưởi giúp phục hồi tóc hư tổn do uốn, nhuộm,
						đồng thời cung cấp độ ẩm và giúp tóc mềm mượt hơn.
					</p>

					<h4 style="color:#35542d;margin:15px 0;">Thành phần nổi bật</h4>
					<ul style="padding-left:20px;color:#666;">
						<li>Tinh dầu bưởi</li>
						<li>Dầu dừa</li>
						<li>Vitamin E</li>
						<li>Protein thực vật</li>
					</ul>

					<h4 style="color:#35542d;margin:15px 0;">Công dụng</h4>
					<ul style="padding-left:20px;color:#666;">
						<li>Phục hồi tóc hư tổn.</li>
						<li>Dưỡng tóc mềm mượt.</li>
						<li>Giảm khô xơ.</li>
						<li>Tăng độ đàn hồi cho tóc.</li>
					</ul>
				`
			},		
				"Cà phê Đắk Lắk làm sạch da chết cơ thể 200ml": {
			price: "113.000đ",
			oldPrice: "133.000đ",
			rating: "★★★★★",
			reviews: "225 đánh giá",
			description: `
				<h4 style="color:#35542d;margin:15px 0;">Mô tả sản phẩm</h4>
				<p style="line-height:1.7;color:#666;">
					Sản phẩm tẩy tế bào chết cơ thể từ cà phê Đắk Lắk giúp loại bỏ lớp sừng già,
					làm sạch da và mang lại làn da mềm mịn, tươi sáng hơn.
				</p>

				<h4 style="color:#35542d;margin:15px 0;">Thành phần nổi bật</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Bột cà phê Đắk Lắk</li>
					<li>Bơ cacao</li>
					<li>Dầu dừa</li>
					<li>Vitamin E</li>
				</ul>

				<h4 style="color:#35542d;margin:15px 0;">Công dụng</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Làm sạch tế bào chết.</li>
					<li>Giúp da mềm mịn.</li>
					<li>Dưỡng ẩm.</li>
					<li>Giúp da sáng khỏe.</li>
				</ul>
			`
		},

		"Đường thốt nốt An Giang làm sạch da chết cơ thể 200ml": {
			price: "122.000đ",
			oldPrice: "162.000đ",
			rating: "★★★★★",
			reviews: "245 đánh giá",
			description: `
				<h4 style="color:#35542d;margin:15px 0;">Mô tả sản phẩm</h4>
				<p style="line-height:1.7;color:#666;">
					Đường thốt nốt An Giang kết hợp cùng các loại dầu thực vật giúp làm sạch
					da chết dịu nhẹ, nuôi dưỡng làn da luôn mịn màng.
				</p>

				<h4 style="color:#35542d;margin:15px 0;">Thành phần nổi bật</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Đường thốt nốt</li>
					<li>Dầu hướng dương</li>
					<li>Dầu dừa</li>
					<li>Vitamin E</li>
				</ul>

				<h4 style="color:#35542d;margin:15px 0;">Công dụng</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Tẩy da chết dịu nhẹ.</li>
					<li>Làm sáng da.</li>
					<li>Giữ ẩm.</li>
					<li>Hạn chế khô ráp.</li>
				</ul>
			`
		},

		"Gel tắm khuynh diệp & bạc hà 500ml": {
			price: "221.000đ",
			oldPrice: "241.000đ",
			rating: "★★★★★",
			reviews: "245 đánh giá",
			description: `
				<h4 style="color:#35542d;margin:15px 0;">Mô tả sản phẩm</h4>
				<p style="line-height:1.7;color:#666;">
					Gel tắm khuynh diệp và bạc hà mang lại cảm giác mát lạnh, làm sạch cơ thể
					và khử mùi hiệu quả sau mỗi lần tắm.
				</p>

				<h4 style="color:#35542d;margin:15px 0;">Thành phần nổi bật</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Tinh dầu khuynh diệp</li>
					<li>Tinh dầu bạc hà</li>
					<li>Glycerin</li>
					<li>Vitamin B5</li>
				</ul>

				<h4 style="color:#35542d;margin:15px 0;">Công dụng</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Làm sạch cơ thể.</li>
					<li>Khử mùi.</li>
					<li>Thư giãn.</li>
					<li>Giữ da mềm mại.</li>
				</ul>
			`
		},

		"Sáp dưỡng ẩm đa năng Sen Hậu Giang 30ml": {
			price: "152.000đ",
			oldPrice: "192.000đ",
			rating: "★★★★★",
			reviews: "245 đánh giá",
			description: `
				<h4 style="color:#35542d;margin:15px 0;">Mô tả sản phẩm</h4>
				<p style="line-height:1.7;color:#666;">
					Sáp dưỡng ẩm đa năng giúp dưỡng môi, tay, khuỷu tay và các vùng da khô,
					mang lại làn da mềm mại suốt cả ngày.
				</p>

				<h4 style="color:#35542d;margin:15px 0;">Thành phần nổi bật</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Chiết xuất sen Hậu Giang</li>
					<li>Sáp ong thực vật</li>
					<li>Dầu dừa</li>
					<li>Vitamin E</li>
				</ul>

				<h4 style="color:#35542d;margin:15px 0;">Công dụng</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Dưỡng ẩm.</li>
					<li>Làm mềm vùng da khô.</li>
					<li>Hạn chế bong tróc.</li>
					<li>Phù hợp mọi loại da.</li>
				</ul>
			`
		},

		"Son dưỡng dầu dừa Bến Tre 5g": {
			price: "35.000đ",
			oldPrice: "32.000đ",
			rating: "★★★★★",
			reviews: "245 đánh giá",
			description: `
				<h4 style="color:#35542d;margin:15px 0;">Mô tả sản phẩm</h4>
				<p style="line-height:1.7;color:#666;">
					Son dưỡng môi dầu dừa Bến Tre giúp môi luôn mềm mại, giảm khô nứt,
					mang lại đôi môi căng bóng tự nhiên.
				</p>

				<h4 style="color:#35542d;margin:15px 0;">Thành phần nổi bật</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Dầu dừa nguyên chất</li>
					<li>Sáp thực vật</li>
					<li>Bơ hạt mỡ</li>
					<li>Vitamin E</li>
				</ul>

				<h4 style="color:#35542d;margin:15px 0;">Công dụng</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Dưỡng môi.</li>
					<li>Ngừa nứt nẻ.</li>
					<li>Giữ môi mềm.</li>
					<li>Bảo vệ môi.</li>
				</ul>
			`
		},

		"Cà phê Đắk Lắk làm sạch da chết môi 5g": {
			price: "69.000đ",
			oldPrice: "74.000đ",
			rating: "★★★★★",
			reviews: "115 đánh giá",
			description: `
				<h4 style="color:#35542d;margin:15px 0;">Mô tả sản phẩm</h4>
				<p style="line-height:1.7;color:#666;">
					Tẩy tế bào chết môi từ cà phê Đắk Lắk giúp loại bỏ lớp da chết,
					hỗ trợ môi mềm mịn và hấp thụ son dưỡng tốt hơn.
				</p>

				<h4 style="color:#35542d;margin:15px 0;">Thành phần nổi bật</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Bột cà phê nguyên chất</li>
					<li>Dầu dừa</li>
					<li>Vitamin E</li>
					<li>Bơ cacao</li>
				</ul>

				<h4 style="color:#35542d;margin:15px 0;">Công dụng</h4>
				<ul style="padding-left:20px;color:#666;">
					<li>Tẩy da chết môi.</li>
					<li>Giúp môi mềm mịn.</li>
					<li>Giảm bong tróc.</li>
					<li>Dưỡng môi khỏe.</li>
				</ul>
			`
		},
			"Combo làm sạch da chết và dưỡng ẩm cơ thể từ cà phê Đắk Lắk": {
			price: "295.000đ",
			oldPrice: "315.000đ",
			rating: "★★★★★",
			reviews: "125 đánh giá",
			description: `
				<h4 style="color:#35542d;">Mô tả sản phẩm</h4>
				<p>
					Bộ sản phẩm giúp làm sạch tế bào chết, dưỡng ẩm và nuôi dưỡng làn da
					mềm mịn mỗi ngày. Thành phần từ cà phê Đắk Lắk kết hợp bơ cacao và
					vitamin E giúp làn da sáng khỏe, hạn chế khô ráp.
				</p>

				<h4 style="color:#35542d;">Combo gồm</h4>
				<ul>
					<li>Tẩy da chết cơ thể Cà phê Đắk Lắk 200ml</li>
					<li>Kem dưỡng thể Cà phê Đắk Lắk 200ml</li>
				</ul>

				<h4 style="color:#35542d;">Công dụng</h4>
				<ul>
					<li>Làm sạch tế bào chết.</li>
					<li>Dưỡng ẩm sâu.</li>
					<li>Làm sáng và mềm mịn da.</li>
					<li>Hương cà phê dễ chịu.</li>
				</ul>

				<h4 style="color:#35542d;">Phù hợp</h4>
				<p>Mọi loại da, đặc biệt da khô và xỉn màu.</p>
			`
		},

		"GIFTBOX \"COCOON ĐÃ CÓ MẶT TẠI PHÁP\"": {
			price: "Đã hết hàng",
			oldPrice: "1.599.000đ",
			rating: "★★★★★",
			reviews: "245 đánh giá",
			description: `
				<h4 style="color:#35542d;">Mô tả sản phẩm</h4>
				<p>
					Giftbox phiên bản giới hạn được Cocoon ra mắt nhân dịp thương hiệu
					chính thức có mặt tại thị trường Pháp. Hộp quà cao cấp với thiết kế
					sang trọng, thích hợp làm quà tặng.
				</p>

				<h4 style="color:#35542d;">Bộ quà gồm</h4>
				<ul>
					<li>Nhiều sản phẩm chăm sóc da bán chạy của Cocoon.</li>
					<li>Túi quà cao cấp.</li>
					<li>Thiệp giới thiệu thương hiệu.</li>
					<li>Hộp quà thiết kế giới hạn.</li>
				</ul>

				<h4 style="color:#35542d;">Điểm nổi bật</h4>
				<ul>
					<li>100% thuần chay.</li>
					<li>Không thử nghiệm trên động vật.</li>
					<li>Thiết kế độc quyền.</li>
					<li>Phù hợp làm quà tặng.</li>
				</ul>

				<p style="color:#d62828;font-weight:bold;">
					Sản phẩm hiện đã hết hàng.
				</p>
			`
		},
		"Gel rửa mặt cà phê 140ml + Tẩy da chết mặt cà phê 150ml": {
			price: "334.000đ",
			oldPrice: "364.000đ",
			rating: "★★★★★",
			reviews: "245 đánh giá",
			description: `
				<h4 style="color:#35542d;">Mô tả</h4>
				<p>Combo chăm sóc da mặt giúp làm sạch sâu, loại bỏ bụi bẩn và tế bào chết, mang lại làn da mềm mịn, thông thoáng.</p>

				<h4 style="color:#35542d;">Sản phẩm gồm</h4>
				<ul>
					<li>Gel rửa mặt cà phê 140ml</li>
					<li>Tẩy da chết mặt cà phê 150ml</li>
					<li>Tặng Tẩy da chết cơ thể Cà phê Đắk Lắk 200ml</li>
				</ul>

				<h4 style="color:#35542d;">Công dụng</h4>
				<p>Làm sạch da, hỗ trợ thu nhỏ lỗ chân lông, giúp da sáng khỏe tự nhiên.</p>
			`
		},

		"Combo chăm sóc da mụn toàn diện": {
			price: "354.000đ",
			oldPrice: "384.000đ",
			rating: "★★★★★",
			reviews: "125 đánh giá",
			description: `
				<h4 style="color:#35542d;">Mô tả</h4>
				<p>Combo dành cho da dầu mụn với các sản phẩm làm sạch và dưỡng ẩm dịu nhẹ.</p>

				<h4 style="color:#35542d;">Ưu điểm</h4>
				<ul>
					<li>Làm sạch sâu</li>
					<li>Giảm dầu nhờn</li>
					<li>Hỗ trợ giảm mụn</li>
					<li>Tặng mặt nạ Nghệ Hưng Yên 30ml</li>
				</ul>

				<h4 style="color:#35542d;">Đối tượng</h4>
				<p>Da dầu, da hỗn hợp và da đang gặp tình trạng mụn.</p>
			`
		},

		"Combo làm sạch và chăm sóc da mụn từ Bí Đao": {
			price: "Đã hết hàng",
			oldPrice: "685.000đ",
			rating: "★★★★★",
			reviews: "245 đánh giá",
			description: `
				<h4 style="color:#35542d;">Mô tả</h4>
				<p>Bộ sản phẩm chăm sóc da mụn từ Bí Đao giúp làm sạch, giảm dầu và làm dịu da.</p>

				<h4 style="color:#35542d;">Thành phần nổi bật</h4>
				<ul>
					<li>Bí Đao</li>
					<li>Rau Má</li>
					<li>Tinh dầu Tràm Trà</li>
				</ul>

				<h4 style="color:#35542d;">Tình trạng</h4>
				<p>Sản phẩm hiện đã hết hàng và sẽ sớm được bổ sung.</p>
			`
		},

		"Combo sáng da từ Nghệ Hưng Yên": {
			price: "354.000đ",
			oldPrice: "384.000đ",
			rating: "★★★★★",
			reviews: "255 đánh giá",
			description: `
				<h4 style="color:#35542d;">Mô tả</h4>
				<p>Combo dưỡng sáng da từ nghệ giúp cải thiện làn da xỉn màu, hỗ trợ làm đều màu da.</p>

				<h4 style="color:#35542d;">Bao gồm</h4>
				<ul>
					<li>Sữa rửa mặt Nghệ</li>
					<li>Kem dưỡng Nghệ</li>
					<li>Tặng mặt nạ Nghệ Hưng Yên 30ml</li>
				</ul>

				<h4 style="color:#35542d;">Công dụng</h4>
				<p>Giúp da sáng khỏe, mềm mịn và cấp ẩm hiệu quả.</p>
			`
		},

		"Combo làm sạch da chết toàn diện từ Cà phê Đắk Lắk": {
			price: "255.000đ",
			oldPrice: "285.000đ",
			rating: "★★★★★",
			reviews: "245 đánh giá",
			description: `
				<h4 style="color:#35542d;">Mô tả</h4>
				<p>Combo tẩy tế bào chết cho mặt, môi và cơ thể từ cà phê Đắk Lắk nguyên chất.</p>

				<h4 style="color:#35542d;">Bao gồm</h4>
				<ul>
					<li>Tẩy da chết mặt</li>
					<li>Tẩy da chết cơ thể</li>
					<li>Tặng tẩy da chết môi 5g</li>
				</ul>

				<h4 style="color:#35542d;">Hiệu quả</h4>
				<p>Giúp da mịn màng, sạch khỏe và tăng khả năng hấp thụ dưỡng chất.</p>
			`
		},

		"Combo gội xả Bưởi không sulfate giảm gãy rụng tóc Cocoon": {
			price: "453.000đ",
			oldPrice: "585.000đ",
			rating: "★★★★★",
			reviews: "127 đánh giá",
			description: `
				<h4 style="color:#35542d;">Mô tả</h4>
				<p>Combo dầu gội và dầu xả Bưởi Cocoon giúp giảm gãy rụng, nuôi dưỡng tóc chắc khỏe.</p>

				<h4 style="color:#35542d;">Bao gồm</h4>
				<ul>
					<li>Dầu gội Bưởi 500ml</li>
					<li>Dầu xả Bưởi 310ml</li>
					<li>Tặng Serum Sachi phục hồi tóc 70ml</li>
				</ul>

				<h4 style="color:#35542d;">Công dụng</h4>
				<p>Làm sạch tóc, giảm gãy rụng, nuôi dưỡng chân tóc và kích thích tóc chắc khỏe hơn.</p>
			`
		}
	
    };

    function openDetailModal(productName, productImage) {
        const modal = document.getElementById("productModal");
        if (!modal) return;

        const product = productDetails[productName];
        if (!product) {
            showToast("⚠️ Thông tin sản phẩm không tìm thấy!");
            return;
        }

        const imageSrc = productImage || "images/default-product.jpg";

        const modalContent = modal.querySelector("div");
        modalContent.innerHTML = `
            <span onclick="closeModal()" style="position:absolute; top:15px; right:20px; cursor:pointer; font-size:28px; color:#999; font-weight:bold; transition:0.3s; z-index:10;">&times;</span>
            <div style="display:flex; flex-direction:column; gap:20px; max-height:80vh; overflow-y:auto; padding:30px; width:100%; max-width:700px;">
                <div>
                    <img src="${imageSrc}" alt="${productName}" style="width:100%; height:300px; object-fit:cover; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
                </div>
                <div>
                    <h3 style="color:#35542d; margin-bottom:15px; font-size:20px; font-weight:700;">${productName}</h3>
                    <p><strong>Giá:</strong> <span style="font-size:18px; font-weight:700; color:#6d8b33;">${product.price}</span></p>
                    <p style="color:#999; text-decoration:line-through;">Giá gốc: ${product.oldPrice}</p>
                    <p style="margin-top:10px;"><strong>Đánh giá:</strong> ${product.rating} (${product.reviews})</p>
                    <hr style="margin:15px 0; border:none; border-top:1px solid #ddd;">
                    ${product.description}
                    <button onclick="addToCartFromModal('${productName}')" style="width:100%; padding:12px; background:#35542d; color:#fff; border:none; border-radius:6px; font-weight:600; font-size:14px; cursor:pointer; margin-top:20px; transition:0.3s;">
                        🛒 Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;

        modal.style.display = "flex";
    }

    window.closeModal = function() {
        const modal = document.getElementById("productModal");
        if (modal) modal.style.display = "none";
    }

    window.addToCartFromModal = function(productName) {
        updateCartCount(1);
        showToast("🛒 Đã thêm vào giỏ hàng!");
        closeModal();
    }

  
    document.querySelectorAll("a[href='detail.html']").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const productCard = this.closest(".product-card, .product-item");
            const productName = productCard?.querySelector("h3")?.textContent.trim() || "Sản phẩm";
            const productImage = productCard?.querySelector("img")?.src || "";
            openDetailModal(productName, productImage);
        });
    });


    const modal = document.getElementById("productModal");
    if (modal) {
        modal.addEventListener("click", function (e) {
            if (e.target === this) closeModal();
        });
    }

});


