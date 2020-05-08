package services;

import com.google.gson.Gson;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created By ReddyGadu
 * Created On 11/20/19
 * Project Name Information Retrieval
 **/
@Path("/twitter")
public class TweetRequestServices {

    @GET
    @Produces("application/json")
    @Path("/getTweets/{param}")
    public Response getPOItweets(@PathParam("param") String param) throws IOException, SolrServerException {
        String url = "http://18.222.178.180:8983/solr/core1";

//        url = url + "tweet_text:("+param+")";
        SolrClient solr = new HttpSolrClient.Builder(url).build();;
        SolrQuery sq = new SolrQuery();
        sq.setQuery("tweet_text:("+param+")");
        sq.setRows(5000);
        QueryResponse qr = solr.query(sq);
        SolrDocumentList docList = qr.getResults();
        Response resp = responseUtility(docList);
        return resp;
    }

    @GET
    @Path("/getFilteredTweets/{param}")
    public Response getFilteredTweets(@PathParam("param") String data) throws IOException, SolrServerException {
        String url = "http://18.222.178.180:8983/solr/core1";
//        url = url + "tweet_text:("+param+")";
        SolrClient solr = new HttpSolrClient.Builder(url).build();;
        SolrQuery sq = new SolrQuery();
        sq.setQuery(data);
        sq.setRows(5000);
        QueryResponse qr = solr.query(sq);
        SolrDocumentList docList = qr.getResults();
        Response resp = responseUtility(docList);
        return resp;
    }

    @GET
    @Path("search/{param}")
    public void getSearchResults(@PathParam("param") String query) {
    }

    public Response responseUtility(SolrDocumentList docList){
        JSONArray array = new JSONArray();
        Gson gson = new Gson();
        for(int i=0; i<docList.size();i++){
            JSONObject obj = new JSONObject();
            obj.put("tweet_text", docList.get(i).get("tweet_text"));
            obj.put("lang", docList.get(i).get("lang"));
            obj.put("country", docList.get(i).get("country"));
            obj.put("name", docList.get(i).get("name"));
            obj.put("user_name", docList.get(i).get("user_name"));
            obj.put("created_at", docList.get(i).get("created_at"));
            obj.put("retweeted", docList.get(i).get("retweeted"));
            obj.put("verified", docList.get(i).get("verified").toString());
            obj.put("favorite_count", ""+docList.get(i).get("favorite_count"));
            obj.put("topic", ""+docList.get(i).get("topic"));
            obj.put("sentiment", ""+docList.get(i).get("sentiment").toString().trim());
            array.put(obj);
        }
        List<Object> list = array.toList();
        String json = gson.toJson(list);
        System.out.println(json);
        return Response.status(200).entity(json).build();
    }
    public static void main(String[] args) throws IOException {
        List<String> v = new ArrayList<>();
        Set<String> set = new HashSet<>();

    }
}