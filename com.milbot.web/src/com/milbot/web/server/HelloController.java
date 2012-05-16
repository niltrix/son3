package com.milbot.web.server;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;

@Controller
public class HelloController {

	private static String HUNTINGGROUNDENTITY = "HunterPoint";
	
	public HelloController() {

	}

	@RequestMapping("/putHunterPoint.do")
	public void saveHuntingField(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value="server") String name, 
			@RequestParam(value="x") Short x,
			@RequestParam(value="y") Short y, 
			@RequestParam(value="level", required=false) Short level,
			@RequestParam(value="barbarian", required=false) Integer bcount ,
			@RequestParam(value="robber", required=false) Integer rcount,
			@RequestParam(value="checked", required=false) Integer check) {

		if (name == null || x == null || y == null) {
			PrintWriter writer;
			try {
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("code", -1);
				jsonObject.put("ret", "");
				writer = response.getWriter();
				writer.println(jsonObject);
			} catch (JSONException e) {
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		String jsonpCB = request.getParameter("jsonpcallback");
		String strKey = name+'-'+x.toString()+'-'+y.toString();
		
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Entity dbEntity = new Entity(HUNTINGGROUNDENTITY, strKey);
		try {
			dbEntity = datastore.get(KeyFactory.createKey(HUNTINGGROUNDENTITY, strKey));
			dbEntity.setProperty("server", name);
			dbEntity.setProperty("x", x);
			dbEntity.setProperty("y", y);
			if (level != null)
				dbEntity.setProperty("level", level);
			if (bcount != null)
				dbEntity.setProperty("barbarian", bcount);
			if (rcount != null)
				dbEntity.setProperty("robber", rcount);
			if (check != null)
				dbEntity.setProperty("checked", check);
			
			datastore.put(dbEntity);
		} catch (EntityNotFoundException e1) {
			dbEntity.setProperty("server", name);
			dbEntity.setProperty("x", x);
			dbEntity.setProperty("y", y);
			if (level != null)
				dbEntity.setProperty("level", level);
			if (bcount != null)
				dbEntity.setProperty("barbarian", bcount);
			if (rcount != null)
				dbEntity.setProperty("robber", rcount);
			if (check != null)
				dbEntity.setProperty("checked", check);
		}
		
		int retcode = 0;

		PrintWriter writer;
		try {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("code", retcode);
			jsonObject.put("ret", "");
			writer = response.getWriter();
			writer.println(jsonpCB+"("+jsonObject+")");
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/getHunterPoint.do")
	public void getHuntingPoint0(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value="server") String name, 
			@RequestParam(value="offset") Short offset,
			@RequestParam(value="limit") Short limit,
			@RequestParam(value="level", required=false) Short level) throws IOException, JSONException {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query(HUNTINGGROUNDENTITY);
		q.addFilter("server", Query.FilterOperator.EQUAL, name);
		if(level != null) {
			q.addFilter("level", Query.FilterOperator.EQUAL, level);
		}
		PreparedQuery pq = datastore.prepare(q);
		List<Entity> results = pq.asList(FetchOptions.Builder.withOffset(offset).limit(limit));
		
		String jsonpCB = request.getParameter("jsonpcallback");
		PrintWriter writer = response.getWriter();
		JSONObject jsonObject = new JSONObject();
	
		List<Map<String, Object>> jsonresults = new ArrayList<Map<String, Object>>();
		for(Entity entity : results) {
			jsonresults.add(entity.getProperties());
		}
		jsonObject.put("ret", jsonresults);
		jsonObject.put("code", 0);
		writer.println(jsonpCB+"("+jsonObject+")");
	}
	
	@RequestMapping("/getucHunterPoint.do")
	public void getHuntingPoint1(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value="server") String name, 
			@RequestParam(value="offset") Short offset,
			@RequestParam(value="limit") Short limit,
			@RequestParam(value="level", required=false) Short level) throws IOException, JSONException {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query(HUNTINGGROUNDENTITY);
		q.addFilter("server", Query.FilterOperator.EQUAL, name);
		q.addFilter("checked", Query.FilterOperator.NOT_EQUAL, 1);
		if(level != null) {
			q.addFilter("level", Query.FilterOperator.EQUAL, level);
		}
		PreparedQuery pq = datastore.prepare(q);
		List<Entity> results = pq.asList(FetchOptions.Builder.withOffset(offset).limit(limit));
		
		String jsonpCB = request.getParameter("jsonpcallback");
		PrintWriter writer = response.getWriter();
		JSONObject jsonObject = new JSONObject();
	
		List<Map<String, Object>> jsonresults = new ArrayList<Map<String, Object>>();
		for(Entity entity : results) {
			jsonresults.add(entity.getProperties());
		}
		jsonObject.put("ret", jsonresults);
		jsonObject.put("code", 0);
		writer.println(jsonpCB+"("+jsonObject+")");
	}
	
	@RequestMapping("/getcHunterPoint.do")
	public void getHuntingPoint2(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value="server") String name, 
			@RequestParam(value="offset") Short offset,
			@RequestParam(value="limit") Short limit,
			@RequestParam(value="level", required=false) Short level) throws IOException, JSONException {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query(HUNTINGGROUNDENTITY);
		q.addFilter("server", Query.FilterOperator.EQUAL, name);
		q.addFilter("checked", Query.FilterOperator.EQUAL, 1);
		if(level != null) {
			q.addFilter("level", Query.FilterOperator.EQUAL, level);
		}
		PreparedQuery pq = datastore.prepare(q);
		List<Entity> results = pq.asList(FetchOptions.Builder.withOffset(offset).limit(limit));
		
		String jsonpCB = request.getParameter("jsonpcallback");
		PrintWriter writer = response.getWriter();
		JSONObject jsonObject = new JSONObject();
	
		List<Map<String, Object>> jsonresults = new ArrayList<Map<String, Object>>();
		for(Entity entity : results) {
			jsonresults.add(entity.getProperties());
		}
		jsonObject.put("ret", jsonresults);
		jsonObject.put("code", 0);
		writer.println(jsonpCB+"("+jsonObject+")");
	}
	
	@RequestMapping("/checkmilbotuser.do")
	public void checkmilbotuser(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value="account") String name) throws IOException, JSONException {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query("MILBOTIDS");
		q.addFilter("account", Query.FilterOperator.EQUAL, name);
		PreparedQuery pq = datastore.prepare(q);
		int result = pq.countEntities(FetchOptions.Builder.withDefaults());
		PrintWriter writer = response.getWriter();
		if (result > 0) {
			writer.println("success");
		} else {
			writer.println("fail");
		}
		
		
	}
}
