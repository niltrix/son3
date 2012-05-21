package com.milbot.bot;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Calendar;

import android.content.Context;
import android.os.Environment;


public class FileBotLog 
{
	private static String m_strLogFileFolderPath = "";
	private static String m_strLogFileName = "botlog.txt";
	
	public static void initialize(Context context)
	{
		boolean bSDCardExist = Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED);
		if (bSDCardExist == true)
		{
			m_strLogFileFolderPath = Environment.getExternalStorageDirectory().getAbsolutePath();
		}
		else
		{
			m_strLogFileFolderPath = "";
		}
	}
	
	public static void setFileName(String strFileName)
	{
		m_strLogFileName = strFileName;
	}
	
	public static void reset()
	{
		File file = new File(m_strLogFileFolderPath + "/" + m_strLogFileName);
		file.delete();
		
		write("botlog.reset()");
	}
	
	public static void write(String strMessage, Object ... args)
	{
		String _strMessage = strMessage;
		if ( (strMessage == null) || (strMessage.length() == 0) )
			return;
		
		if (args.length != 0)
		{
			_strMessage = String.format(strMessage, args);
		}
		
		_strMessage = getCurrentTime() + " " + _strMessage + "\n";
		
		File file = new File(m_strLogFileFolderPath + "/" + m_strLogFileName);
		FileOutputStream fos = null;
		
		try
		{
			fos = new FileOutputStream(file, true);
			if (fos != null)
			{
				fos.write(_strMessage.getBytes());
			}
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			try
			{
				if (fos != null)
				{
					fos.close();
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
	}
	
	private static String getCurrentTime()
	{
		Calendar calendar = Calendar.getInstance();
		String strTime = String.format("%d-%d-%d %d:%d:%d", calendar.get(Calendar.YEAR), 
															calendar.get(Calendar.MONTH) + 1,
															calendar.get(Calendar.DAY_OF_MONTH),
															calendar.get(Calendar.HOUR_OF_DAY),
															calendar.get(Calendar.MINUTE),
															calendar.get(Calendar.SECOND));
		return strTime;
	}
}
