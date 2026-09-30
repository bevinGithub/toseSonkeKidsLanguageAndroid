import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import 'cordova-plugin-purchase';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-google-pay-upgrade',
  templateUrl: './google-pay-upgrade.page.html',
  styleUrls: ['./google-pay-upgrade.page.scss'],
  standalone: false,
})
export class GooglePayUpgradePage implements OnInit {
  googleStore!: CdvPurchase.Store;
  url = environment.url;
  freeMonthly = 'free_trial';
  standardMonthly = 'standard_monthly';
  standardAnnual = 'standard_yearly';
  familyX2Monthly = '2_family_monthly';
  familyX2Annual = '2_family_yearly';
  familyX5Monthly = '5_family_monthly';
  familyX5Annual = '5_family_yearly';

  loggedUser: any;
  currentUser: any;

  store?: CdvPurchase.Store;
  error: any;
  storePlay: any;

  products: any;
  product: any;
  productID: any;
  subscription: any;
  googleSubscriptionID: any;

  orderId: any;
  details: any;
  purchaseToken: any;
  transaction: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private platform: Platform,
    private ref: ChangeDetectorRef,
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) {
    this.storageInit();
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.loggedUser = await this.getCurrentUser();
    this.getPurchaseToken(this.loggedUser?.id);
    this.productID = this.activatedRoute.snapshot.paramMap.get('productID');
    console.log('ProductID: ', this.productID);
    this.http.get(this.url + 'get-google-subscription.php?planID=' + this.productID).subscribe({
      next: (res: any) => {
        this.subscription = res;
        this.googleSubscriptionID = this.subscription?.android;
        console.log('Google Subscription ID: ', this.googleSubscriptionID);
        if (this.googleSubscriptionID) {
          this.onDeviceReady();
        } else {
          console.log('Subscription does not exists!');
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getPurchaseToken(userID: any) {
    this.http.get(this.url + 'get-user-details.php?userID=' + userID).subscribe({
      next: (res: any) => {
        console.log(res);
        this.details = res;
        this.orderId = this.details?.orderId;
        this.purchaseToken = this.details?.purchaseToken
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  onDeviceReady() {
    this.platform.ready().then(() => {
      const { store, ProductType, Platform } = CdvPurchase;
      store.verbosity = CdvPurchase.LogLevel.DEBUG;
      store.register(
        [
          {
            id: this.freeMonthly,
            type: ProductType.PAID_SUBSCRIPTION,
            platform: Platform.GOOGLE_PLAY,
          },
          {
            id: this.standardMonthly,
            type: ProductType.PAID_SUBSCRIPTION,
            platform: Platform.GOOGLE_PLAY,
          },
          {
            id: this.standardAnnual,
            type: ProductType.PAID_SUBSCRIPTION,
            platform: Platform.GOOGLE_PLAY,
          },
          {
            id: this.familyX2Monthly,
            type: ProductType.PAID_SUBSCRIPTION,
            platform: Platform.GOOGLE_PLAY,
          },
          {
            id: this.familyX2Annual,
            type: ProductType.PAID_SUBSCRIPTION,
            platform: Platform.GOOGLE_PLAY,
          },
          {
            id: this.familyX5Monthly,
            type: ProductType.PAID_SUBSCRIPTION,
            platform: Platform.GOOGLE_PLAY,
          },
          {
            id: this.familyX5Annual,
            type: ProductType.PAID_SUBSCRIPTION,
            platform: Platform.GOOGLE_PLAY,
          },
      ]);
      store.initialize().then((err) => {
        this.product = store.get(this.googleSubscriptionID);      
        this.ref.detectChanges();
        console.log(this.product);
        this.setProductListeners();
      });
    })
  }

  setProductListeners() {
    CdvPurchase.store.when().productUpdated(() => {
      console.log('====================Products Updated On Store===========================');
    }).approved((transaction: any) => {
      console.log('================Purchase Approved ===================');
      this.ref.detectChanges();
      transaction.verify();
    }).verified((verifiedReceipt: any) => {
      verifiedReceipt.finish();
    }).finished((pdt: any) => {
      console.log("==============TRANSACTION FINISHED===================");
      console.log(pdt?.nativePurchase);
      this.transaction = pdt?.nativePurchase;
      this.orderId = this.transaction?.orderId;
      this.purchaseToken = this.transaction?.purchaseToken;
      pdt.finish();
      const subscriptionData = {
        userID: this.loggedUser.id,
        email: this.loggedUser.email,
        androidID: this.googleSubscriptionID,
        planID: this.productID,
        orderID: this.orderId,
        purchaseToken: this.purchaseToken,
      };
      console.log("==============COMPLETE===================");
      console.log(subscriptionData);
      this.http.post(this.url + 'process-user-google-subscription.php', subscriptionData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.storePlay = res;
          if (this.storePlay?.status === 'success') {
            this.flashNotice(this.storePlay?.state);
            this.router.navigate(['/upgrade-success']);
          }
          if (this.storePlay?.status === 'subscribed') {
            this.flashNotice('User is already subscribed to this plan!');
          }

        },
        error: (err: any) => {
          console.log('Error updating subscription!');
          this.flashNotice('Subscription could not be updated!' + JSON.stringify(err));
        }
      });
    }).receiptUpdated((receipt: any) => {
      if (CdvPurchase.store.owned(receipt)) {
        console.log('Product owned!!!');
        this.flashNotice('Subscription is already active!');
      }
    });

    CdvPurchase.store.error((error: any) => {
      if (this.error?.isError === true && this.error?.message === "ITEM_ALREADY_OWNED") {
        this.flashNotice(`You are already subscribed to ${ this.product?.title}`);
      } else {
        console.log(error);
      }
    });
  }

  async storageInit() {
    await this.storage.create();
  }

  getCurrentUser() {
    this.currentUser = this.storage.get('currentUser');
    return this.currentUser;
  }

  /** https://github.com/j3k0/cordova-plugin-purchase/blob/95e935c56b11ad0ed614f37a1979924ee41cc250/src/example/example.ts#L8 **/
  /** Upgrade or Downgrade line 83 */
  async changeSubscription(data: any) {
    const loading = await this.loadingController.create({ message: 'Please wait...' });
    loading.present();
    const googleProduct = data?.productID;
    const product = CdvPurchase.store.get(googleProduct);
    if (!product) {
      console.log('Product not found!');
      loading.dismiss();
      this.flashNotice('Product not found!');
      return;
    }

    let subscriptionOffer: CdvPurchase.Offer | undefined;
    subscriptionOffer = CdvPurchase.store.get(googleProduct)?.getOffer();
    if (!subscriptionOffer) {
      loading.dismiss();
      this.flashNotice('No available offer for this product.');
      return;
    }
    CdvPurchase.store.order(subscriptionOffer, {
      googlePlay: {
        oldPurchaseToken: this.purchaseToken,
        prorationMode: CdvPurchase.GooglePlay.ProrationMode.DEFERRED,
      }
    }).then((err: any) => {
      if (err) {
        console.log(err);
        if (err.code === CdvPurchase.ErrorCode.PAYMENT_CANCELLED) {
          console.log('Payment cancelled by user!');
          loading.dismiss();
          this.flashNotice('Payment cancelled by user!');
        } else {
          loading.dismiss();
          console.log('Failed to subscribe:', err);
          this.flashNotice('Failed to subscribe user');
        }
        loading.dismiss();
      } else {
        loading.dismiss();
      }
    });
  }

  // /** Check if user has an active subscription */
  hasActiveSubscription(): boolean {
    return CdvPurchase.store.owned('subscription1');
  }

  async flashNotice(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
