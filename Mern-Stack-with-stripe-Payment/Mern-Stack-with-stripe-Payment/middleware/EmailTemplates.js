export const OrderTemplate = (order) => {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" background-color: #e8ebe9; padding-top: 20px;">
  <tr>
    <td align="center">
      <div style="width: 100%; max-width: 650px; margin: 0 auto;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="width: 100%; max-width: 650px; margin: 0 auto;">
          <tbody>
            <tr>
              <td>
                <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0"
                  style="margin: 0 auto; background: #ffffff;">
                  <tbody>

                    <td style="padding:70px 0px; background-color: #fce6dd;">

                      <div style="text-align: center;">
                        <a href="${
                          order.url
                        }" target="_blank" style="display: inline-block;"><img
                          style="width: 100%; height: 70px;"
                            src="https://res.cloudinary.com/dxiadyi2i/image/upload/v1689854551/OnlineShop/p9bb0d45hozcjhiu0gab.png" alt=""></a>
                      </div>

                      <div
                        style="color: #000000; font-size: 15px; font-family: Verdana, sans-serif; text-align: center;margin: 30px 0;">
                        Thank you for shopping with us. Here are the details of your order.
                      </div>
                      <div style="text-align: center;">
                         <button style="background-color: #ed4c07; width:27%; padding: 14px 0px; border: none; border-radius: 100px; font-size: 15px; font-family: Verdana, sans-serif;">
                          <a href="${
                            order?.orderUrl
                          }" target="_blank" style="color: #ffffff; text-decoration: none;">
                            View Order
                          </a>
                        </button>
                      </div>
                    </td>
                  </td>
            </tr>
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                  style="background-color: #ffffff; border: 2px solid #f1f0f0;">
                  <tbody>
                    <tr>
                      <td width="600"
                        style="padding-top: 70px; padding-bottom: 40px; padding-left: 70px; padding-right: 70px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tbody>
                            ${order?.products?.map(
                              (item) =>
                                `<tr>
                           <td
                             style="font-family: Verdana, sans-serif; color: #000000; text-align: left;">
                            <div style="margin-bottom: 15px; display:flex; align-items:center;">
                               <img src="${item?.image}" alt="" style="width: 60px; height: 60px; margin-top:10px; margin-right:10px;object-fit: cover;">
                               <div>
                               <a href="${order.url}/card/${item?.product}" style="color: #0b32a6;font-size:15px;margin-bottom:2px">${item?.name}</a>
                               <p style="font-size:15px;margin-bottom:2px">Size : ${item?.size}</p>
                               <p style="font-size:15px">Color : ${item?.color}</p>
                               </div>
                              </div>
                             <div style="border-bottom: 1px solid #edecec;"></div>
                           </td>
                         </tr>`
                            )}
                        
                          

                            <tr>
                              <td
                                style="font-family: Verdana, sans-serif; color: #000000; text-align: left;">
                                <div style="padding:20px 0">
                                <label style="font-size:15px">Subtotal</label>
                                <div style="font-weight: 600;font-size:13px;float:right">$${
                                  order?.subTotal
                                }</div>
                                </div>
                                <div style="border-bottom:1px solid #edecec;"></div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                style="font-family: Verdana, sans-serif; color: #000000; text-align: left;">
                                <div style="padding:20px 0">
                                <label style="font-size:15px">Shipping cost</label>
                                <div style="font-weight: 600;font-size:13px;float:right">$${
                                  order?.shippingCost
                                }</div>
                                </div>
                                <div style="border-bottom:1px solid #edecec;"></div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                style="font-family: Verdana, sans-serif; color: #000000; text-align: left;">
                                <div style="padding:20px 0">
                                <label style="font-size:15px">Tax</label>
                                <div style="font-weight: 600;font-size:13px;float:right">$${
                                  order?.taxPrice
                                }</div>
                                </div>
                                <div style="border-bottom:1px solid #edecec;"></div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                style="font-family: Verdana, sans-serif; color: #000000; text-align: left;">
                                <div style="padding:20px 0">
                                <label style="font-size:15px">Total</label>
                                <div style="font-weight: 600;font-size:13px;float:right">$${
                                  order?.totalPrice
                                }</div>
                                </div>
                                <div style="border-bottom:1px solid #edecec;"></div>
                              </td>
                 
                            <tr>
                              <td height="50"></td>
                            </tr>
                            <tr>
                              <td>
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="text-align: center;">
                                        <a href="https://www.facebook.com" target="_blank"
                                          style="display: inline-block; margin-right: 3px;"><img
                                            src="http://stansafaris.com/wp-content/plugins/cf7-email-add-on/admin/assets/images/facebook-icon.png"></a>
                                        <a href="https://twitter.com" target="_blank"
                                          style="display: inline-block; margin-left: 3px; margin-right: 3px;"><img
                                            src="http://stansafaris.com/wp-content/plugins/cf7-email-add-on/admin/assets/images/twitter-icon.png"></a>
                                        <a href="https://www.linkedin.com" target="_blank"
                                          style="display: inline-block; margin-left: 3px; margin-right: 3px;"><img
                                            src="http://stansafaris.com/wp-content/plugins/cf7-email-add-on/admin/assets/images/linkedin-icon.png"></a>
                                        <a href="https://www.instagram.com" target="_blank"
                                          style="display: inline-block; margin-left: 3px; margin-right: 3px;"><img
                                            src="http://stansafaris.com/wp-content/plugins/cf7-email-add-on/admin/assets/images/instagram-icon.png"></a>
                                        <a href="https://www.pinterest.com" target="_blank"
                                          style="display: inline-block; margin-left: 3px; margin-right: 3px;"><img
                                            src="http://stansafaris.com/wp-content/plugins/cf7-email-add-on/admin/assets/images/pinterest-icon.png"></a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
    </td>
  </tr>
  </tbody>

<tr>
  <td>
    <div style="width: 100%; max-width: 620px; margin: 0 auto;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td
            style="font-family: Verdana, sans-serif; font-weight: normal; font-size: 14px; line-height: 24px; color: #3e3e3e; text-align: left; padding-bottom: 30px; padding-top: 15px;">
            Copyright © 2023 <a href="${order.url}" target="_blank"
              style="text-decoration: none; color: #ed4c07">${
                order?.siteName
              }</a>
          </td>
          <td
            style="font-family: Verdana, sans-serif; font-weight: normal; font-size: 14px; line-height: 24px; color: #3e3e3e; text-align: right; padding-bottom: 30px; padding-top: 15px;">
            Powered by <a href="#" target="_blank" style="text-decoration: none; color: #ed4c07;">${
              order?.siteName
            }
              Company</a>
          </td>
        </tr>
      </table>
    </div>
  </td>
</tr>
</table>
`;
};
