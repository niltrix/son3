package com.milbot.bot;

import android.app.Activity;
import android.app.NotificationManager;
import android.os.Bundle;
import android.widget.TextView;

public class NotificationMsg extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		TextView tv = new TextView(this);
		Bundle extras = getIntent().getExtras();
		tv.setText(extras.getString("warinfo"));
		setContentView(tv);
		
		NotificationManager nm =
				(NotificationManager)getSystemService(NOTIFICATION_SERVICE);
		
		nm.cancel(0x219);
	}

}
