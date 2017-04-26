import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';

@IonicPage()
@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html'
})

export class ArticlesPage {

  articles: Array<any>;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public toastCtrl: ToastController,
  	public data: DataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlesPage');
    /* 
      Fetching Data after View Loaded
      Don't put this request in constructor
      As, it will call the API irrespective of 
      what ionViewCanEnter will return
    */
    this.fetchArticles();
  }

  fetchArticles() {
    this.data.getArticles().subscribe(articles => {
      this.articles = articles;
    })
   
    // this.httpclient
    // .get("http://ec2-35-161-22-91.us-west-2.compute.amazonaws.com:4000/api/articles?filter[limit]=10")
    // .subscribe(response => { console.log(response.text()); });
  }

  ionViewCanEnter() {
    console.log("in ionViewCanEnter")
    var self = this;
    return new Promise((resolve, reject) => {
      self.data.isAuthorised().then(res => {
        if(!res) {
          let toast = self.toastCtrl.create({
            message: "Please Login to access this view",
            duration: 1500
          });
          toast.present();
          reject(true);
        } else {
          resolve(true);
        }
      })
    });
  }

}
