export const calculeCoupon = (amount: number, discount:number) => {
  var amountCoupon = amount;
  var amountDiscount = (amount * discount / 100);
  var amountWithDiscount = (amount - amountDiscount).toFixed(2)

  return {
    amountCoupon,
    amountDiscount: amountDiscount.toFixed(2),
    amountWithDiscount
  }
}