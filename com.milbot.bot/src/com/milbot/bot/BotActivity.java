package com.milbot.bot;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import android.R.bool;
import android.R.color;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
//import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings.PluginState;
import android.webkit.WebSettings.ZoomDensity;
import android.widget.EditText;
import android.widget.LinearLayout;

public class BotActivity extends Activity {
	
	public View mainView;
	protected String currentUser = "";
	protected String currentView = "";
	
	int selectedItemId = 0;
	
	private NotificationManager nm;
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		
		mainView = findViewById(R.id.wv1);
		initWebView();
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
		clearApplicationCache(null);
	}
	
	private void initWebView()
	{
		WebView localWebView = (WebView)this.mainView.findViewById(R.id.wv1);
		WebSettings localWebSettings = localWebView.getSettings();
		localWebSettings.setJavaScriptEnabled(true);
		localWebSettings.setDomStorageEnabled(true);
		localWebSettings.setLightTouchEnabled(false);
		localWebSettings.setDatabaseEnabled(true);
		localWebSettings.setDatabasePath(getApplicationContext().getDir("database", 0).getPath());
//		localWebSettings.setPluginState(PluginState.ON);
		localWebView.setScrollBarStyle(0);
		localWebView.setOnKeyListener(new View.OnKeyListener()
		{
			public boolean onKey(View v, int keyCode, KeyEvent event)
			{
				if ((event.getAction() == KeyEvent.ACTION_UP) && (keyCode == KeyEvent.KEYCODE_BACK)) {
					return ingameReturnKeyWithView(v);
				}
				return false;
			}
		});
		localWebView.setWebViewClient(new myWebClient(this.getAssets()));
		registerJavascriptObject(localWebView);
		localWebView.requestFocusFromTouch();
		DisplayMetrics localDisplayMetrics = new DisplayMetrics();
		getWindowManager().getDefaultDisplay().getMetrics(localDisplayMetrics);
		localWebView.setInitialScale((int)(100.0D * Math.min(localDisplayMetrics.widthPixels / 480.0D, localDisplayMetrics.heightPixels / 320.0D)));
	    if (Build.PRODUCT.equals("blaze"))
	        localWebView.setInitialScale((int)(96.0D * Math.min(localDisplayMetrics.widthPixels / 480.0D, localDisplayMetrics.heightPixels / 320.0D)));
		if (Build.VERSION.SDK_INT > 13) {
			localWebView.setLayoutParams(new LinearLayout.LayoutParams(-1, -1));
		}
//		localWebView.setOverScrollMode(WebView.OVER_SCROLL_IF_CONTENT_SCROLLS); 
		localWebView.loadUrl("file:///android_asset/build/start.html");
	}

	private WebView getGameClientWebView()
	{
		WebView localWebView = null;
		if (this.mainView == null) {
			localWebView = (WebView)this.mainView.findViewById(R.id.wv1);
		} else {
			localWebView = (WebView) this.mainView;
		}
		return localWebView;
	}

	private void sendNotification(String tickerText, String contentTitle, String contentText) {
		nm = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);

		Intent notiIntent = new Intent(BotActivity.this, NotificationMsg.class);
		notiIntent.putExtra("warinfo", contentText);
		
		PendingIntent intent = PendingIntent.getActivity(BotActivity.this, 0,
				notiIntent, 0);

		// Create Notification Object
		Notification notification =
				new Notification(android.R.drawable.ic_input_add,
						tickerText, System.currentTimeMillis());
		notification.vibrate = new long[] { 100, 100, 200, 200, 300, 300 };
		notification.defaults |= Notification.DEFAULT_SOUND;
		notification.setLatestEventInfo(BotActivity.this,
				contentTitle, contentText, intent);

		nm.notify(0x219, notification);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// TODO Auto-generated method stub
		menu.add(Menu.NONE, 1, 1, "Add User");
		menu.add(Menu.NONE, 2, 2, "Login");
		menu.add(Menu.NONE, 3, 3, "Log-Out");		
		return super.onCreateOptionsMenu(menu);
	}
	
	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// TODO Auto-generated method stub
		switch(item.getItemId()) {
		case 1:
			Context mContext = BotActivity.this;
			LayoutInflater layoutInflater = (LayoutInflater) mContext.getSystemService(LAYOUT_INFLATER_SERVICE);
			View layout = layoutInflater.inflate(R.layout.login_dialog, (ViewGroup) findViewById(R.id.layout_root));
			final EditText userIdText = (EditText) layout.findViewById(R.id.user_id);
			final EditText userPwdText = (EditText) layout.findViewById(R.id.user_password);
			
			AlertDialog.Builder addUserDlg = new AlertDialog.Builder(mContext);
			
			addUserDlg.setView(layout);
			addUserDlg.setTitle("Add User");
			addUserDlg.setMessage("Input Id/Pwd");
			addUserDlg.setPositiveButton("Add",
					new DialogInterface.OnClickListener() {
						public void onClick(DialogInterface dialog,	int which) {
							String userId = userIdText.getText().toString();							
							String userPwd = userPwdText.getText().toString();
							
							if (userId.length() != 0 && userPwd.length() !=0) {
								SharedPreferences prefUserInfo = getSharedPreferences("pref_userinfo", Activity.MODE_PRIVATE);
								SharedPreferences.Editor editor = prefUserInfo.edit();
								editor.putString(userId, userPwd);
								editor.commit();
							} else {
								dialog.dismiss();
							}
							
						}
					})						
				.setNegativeButton("Cancel",
					new DialogInterface.OnClickListener() {
						public void onClick(DialogInterface dialog, int which) {
						}
					});

			addUserDlg.show();

			return true;
		case 2:
			final SharedPreferences prefUserInfo = getSharedPreferences("pref_userinfo", Activity.MODE_PRIVATE);
			
			Map<String, ?> items = prefUserInfo.getAll();
			List<String> userIds = new ArrayList<String>();
			for (String id : items.keySet()) {
				userIds.add(id);
			}
			Collections.sort(userIds);
			
			final String[] strItems = userIds.toArray(new String[] {});
			
			AlertDialog selLogIdDlg = new AlertDialog.Builder(this)
				.setIcon( R.drawable.icon )
				.setTitle( "Select ID" )
				.setPositiveButton("Login" , new DialogInterface.OnClickListener() {
					public void onClick(DialogInterface dialog, int which) {
						WebView localWebView = null;			
						localWebView = getGameClientWebView();			
						String str = localWebView.getTitle();
						
						if ((str != null) && (str.equalsIgnoreCase("login"))) {
							String userId = strItems[selectedItemId];
							String userPwd = prefUserInfo.getString(userId, "");
							localWebView.loadUrl("javascript:loginFunc(\"" + userId + "\",\"" + userPwd + "\",0);");
						}
						dialog.dismiss();
					}
				})
				.setNeutralButton("Delete", new DialogInterface.OnClickListener() {
					public void onClick(DialogInterface dialog,	int which) {							
						SharedPreferences.Editor editor = prefUserInfo.edit();
						editor.remove(strItems[selectedItemId]);
						editor.commit();
					}
				})
				.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
					public void onClick(DialogInterface dialog, int which) {

					}
				})
				.setSingleChoiceItems(strItems , -1, new DialogInterface.OnClickListener() {
					public void onClick(DialogInterface dialog, int which) {
						selectedItemId = which;
					}
				})
				.show();		
			
			return true;
		case 3: 
			WebView localWebView = null;			
			localWebView = getGameClientWebView();
			String str = localWebView.getTitle();
			localWebView.clearCache(true);
			clearApplicationCache(null);
			android.webkit.CookieManager.getInstance().removeAllCookie();
			localWebView.loadUrl("file:///android_asset/build/start.html");
		}
		return super.onOptionsItemSelected(item);
	}
	
	private void clearApplicationCache(java.io.File dir){
        if(dir==null)
            dir = getCacheDir();
        else;
        if(dir==null)
            return;
        else;
        java.io.File[] children = dir.listFiles();
        try{
            for(int i=0;i<children.length;i++)
                if(children[i].isDirectory())
                    clearApplicationCache(children[i]);
                else children[i].delete();
        }
        catch(Exception e){}
    }
	
	public void registerJavascriptObject(WebView paramWebView)
	{
		paramWebView.addJavascriptInterface(new Object()
		{
			public void exit()
			{
				exitGame();
			}

			public String getClientCode()
			{
				return "qq";
			}

			public void setCurrentView(String paramString)
			{
				currentView = paramString;
			}

			public void setPayment(String paramString1, String paramString2, String paramString3)
			{
				//        	BotActivity.this.payment_user = paramString1;
				//        	BotActivity.this.payment_gross = paramString2;
				//        	BotActivity.this.payment_refercode = paramString3;
			}

			public void setPayment(String paramString1, String paramString2, String paramString3, String paramString4)
			{
				//        	BotActivity.this.payment_user = paramString1;
				//        	BotActivity.this.payment_gross = paramString2;
				//        	BotActivity.this.payment_refercode = paramString3;
				//        	BotActivity.this.payment_channel = paramString4;
			}

			public void setUser(String paramString)
			{
				BotActivity.this.currentUser = paramString;
			}
			
			public void clearCache() {
				BotActivity.this.clearApplicationCache(null);
			}
			
			public void sendNoti(String tickerText, String contentTitle, String contentText) 
			{
				BotActivity.this.sendNotification(tickerText, contentTitle, contentText);
			}
			
			public String authenticate(String id)
			{
				String ret = "fail";
				try {
					ret = checkAuth(id);
				} catch (Exception e) {
					ret = "fail";
				}
				return ret;
			}
		}
		, "droid");
	}

	private String checkAuth(String id) throws ParseException, IOException 
	{
		HttpClient client = new DefaultHttpClient();
		String postUrl = "http://nilbons.appspot.com/checkmilbotuser.do";
		HttpPost post = new HttpPost(postUrl);
		List params  = new ArrayList();
		params.add(new BasicNameValuePair("account", id));

		UrlEncodedFormEntity ent = new UrlEncodedFormEntity(params, HTTP.UTF_8);
		post.setEntity(ent);
		HttpResponse responsePost = client.execute(post);
		InputStream inputstm = responsePost.getEntity().getContent();
		String ret = convertToString(inputstm);	
		return ret;
	}
	
	public String convertToString(InputStream inputStream){
        StringBuffer string = new StringBuffer();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String line;
        try {
            while ((line = reader.readLine()) != null) {
                string.append(line);
            }
        } catch (IOException e) {}
        return string.toString();
    }
	
	private boolean ingameReturnKeyWithView(View v) 
	{
		WebView localWebView = null;
		if (v == null) {
			localWebView = getGameClientWebView();
		} else {
			localWebView = (WebView) v.findViewById(R.id.wv1);
		}
		String str = localWebView.getTitle();
		if ((str != null) && (str.equalsIgnoreCase("login")))
		{
			exitGame();
		}
		if ((str != null) && (str.equalsIgnoreCase("avalon")))
		{
			localWebView.loadUrl("javascript:showYesNo(LNG.CONFIRM_EXIT,function(){droid.exit();});");
		}
		if ((this.currentView != null) && (this.currentView.equals("f_city.html")))
		{
			localWebView.loadUrl("javascript:showYesNo('" + getString(R.string.sure_to_exit_game) + "',function(){droid.exit();});");
		} else if ((str != null) && (str.equalsIgnoreCase("Emross")))
		{
			localWebView.loadUrl("javascript:showCity();");
		}
		return true;
	}
	
	private boolean ingameReturnKey()
	{
		WebView localWebView = getGameClientWebView();
		if (localWebView == null) exitGame();

		String str = localWebView.getTitle();
		if ((str != null) && (str.equalsIgnoreCase("login")))
		{
			exitGame();
		}
		if ((str != null) && (str.equalsIgnoreCase("avalon")))
		{
			localWebView.loadUrl("javascript:showYesNo(LNG.CONFIRM_EXIT,function(){droid.exit();});");
		}
		if ((this.currentView != null) && (this.currentView.equals("f_city.html")))
		{
			localWebView.loadUrl("javascript:showYesNo('" + getString(R.string.sure_to_exit_game) + "',function(){droid.exit();});");
		} else if ((str != null) && (str.equalsIgnoreCase("Emross"))) {
			localWebView.loadUrl("javascript:showCity();");
		}
		return false;
	}

	private void exitGame()
	{
		NotificationManager nm =
				(NotificationManager)getSystemService(NOTIFICATION_SERVICE);
		
		nm.cancel(0x219);
		
		finish();
		System.runFinalizersOnExit(true);
		System.exit(0);
	}

	public class myWebClient extends WebViewClient  
	{
		AssetManager am;
		public myWebClient(AssetManager am) {
			this.am = am;
		}

//		@Override
//		public WebResourceResponse shouldInterceptRequest(WebView view,
//				String url) {
//			return super.shouldInterceptRequest(view, url);
//		}

		@Override
		public void onReceivedError(WebView view, int errorCode,
				String description, String failingUrl) {
			
			if (failingUrl.contains("?")) {
	            final int sdkVersion = Integer.parseInt(Build.VERSION.SDK);
	            if (sdkVersion > Build.VERSION_CODES.GINGERBREAD) {
	                String temp;
	                temp = failingUrl.substring(0, failingUrl.indexOf("?"));
	                view.loadUrl(temp); // load page without internal link

	                try {
	                    Thread.sleep(400);
	                } catch (InterruptedException e) {
	                    e.printStackTrace();
	                }
	            }
	        }
			super.onReceivedError(view, errorCode, description, failingUrl);
		}

		@Override  
		public void onPageStarted(WebView view, String url, Bitmap favicon) {  
			super.onPageStarted(view, url, favicon);  
		}  

		@Override  
		public boolean shouldOverrideUrlLoading(WebView view, String url) {  

			if ((url.contains("start.html")) || (url.contains("main.html")))
			{
				view.loadUrl(url);
				return true;
			}
			return super.shouldOverrideUrlLoading(view, url);
		}
		
		
	}  
}