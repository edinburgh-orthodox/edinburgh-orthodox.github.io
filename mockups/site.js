// Shared behaviour for the mockups: side-drawer nav and wishlist total.
(function () {
  // Side drawer: the burger opens it; the close button, the page itself, or
  // Escape closes it. The nav row always stays put.
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  var close = document.querySelector('.drawer-close');

  function openDrawer() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.contains('open') ? closeDrawer() : openDrawer();
    });
  }
  if (close) close.addEventListener('click', closeDrawer);
  if (nav) {
    // Click the dimmed page behind the drawer to close it.
    nav.addEventListener('click', function (e) {
      if (e.target === nav) closeDrawer();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) closeDrawer();
  });

  // Donations page: toggle the bank details block.
  var bankToggle = document.querySelector('#bank-toggle');
  var bankDetails = document.querySelector('#bank-details');
  if (bankToggle && bankDetails) {
    bankToggle.addEventListener('click', function () {
      var show = bankDetails.hidden;
      bankDetails.hidden = !show;
      bankToggle.textContent = show ? 'Hide bank details' : 'Show bank details';
    });
  }

  // Bookstore (honesty box): add books to a cart and total the donation.  var bkTitle = document.querySelector('#bk-title');
  var bkPrice = document.querySelector('#bk-price');
  var bkQty = document.querySelector('#bk-qty');
  var bkAdd = document.querySelector('#bk-add');
  var bkRows = document.querySelector('#bk-rows');
  var bkTotal = document.querySelector('#bk-total');
  if (bkAdd && bkRows && bkTotal) {
    var cartTotal = 0;
    function fmt(n) { return '£' + n.toFixed(2); }
    function recalcTotal() { bkTotal.textContent = fmt(cartTotal); }
    bkAdd.addEventListener('click', function () {
      var title = (bkTitle.value || '').trim();
      var price = parseFloat(bkPrice.value);
      var qty = parseInt(bkQty.value, 10) || 1;
      if (!title || !(price >= 0)) return;
      var lineTotal = (price * qty);
      var row = document.createElement('div');
      row.className = 'row';
      row.innerHTML =
        '<span class="rt">' + title + '</span>' +
        '<span class="rq">× ' + qty + '</span>' +
        '<span class="rp">' + fmt(lineTotal) + '</span>';
      bkRows.appendChild(row);
      cartTotal += lineTotal;
      recalcTotal();
      bkTitle.value = ''; bkPrice.value = ''; bkQty.value = '1';
      bkTitle.focus();
    });
  }
  var items = document.querySelectorAll('.item input[type="checkbox"]');
  var total = document.querySelector('.total-bar strong, #wishlist-total');
  if (items.length && total) {
    function recalc() {
      var sum = 0;
      items.forEach(function (box) {
        if (box.checked) {
          var price = box.closest('.item').querySelector('.price').textContent;
          sum += parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
        }
      });
      total.textContent = '£' + sum;
    }
    items.forEach(function (box) { box.addEventListener('change', recalc); });
    recalc();
  }
})();
