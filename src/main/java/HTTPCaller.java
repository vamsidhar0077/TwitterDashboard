import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.jboss.resteasy.util.Encode;

import javax.ws.rs.PathParam;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.net.http.HttpRequest;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * Created By ReddyGadu
 * Created On 11/18/19
 * Project Name Information Retrieval
 **/

public class HTTPCaller {

    SolrClient solr;
    public HTTPCaller(String urlString){
        solr = new HttpSolrClient.Builder(urlString).build();
    }
    public void hitURl() throws IOException, SolrServerException {
        SolrQuery sq = new SolrQuery();
        sq.setQuery("*:*");
//        sq.setRows(1000);
        QueryResponse qr = solr.query(sq);
        SolrDocumentList docList = qr.getResults();
        System.out.println(docList.getNumFound());
    }

    public void getLangTweets(String lang) throws IOException, SolrServerException {
        SolrQuery sq = new SolrQuery();
        sq.setQuery("tweet_text:"+lang+"");
        sq.setRows(100000);
        QueryResponse qr = solr.query(sq);
        SolrDocumentList docList = qr.getResults();
        FileWriter writer = new FileWriter(new File("/home/vamsidhar/Desktop/TweetsText/"+lang+".txt"));
        for(int i=0;i<docList.getNumFound();i++){
            String id = (String)docList.get(i).get("id_str");
            String text = (String)docList.get(i).get("tweet_text").toString();
            writer.write(id+","+text);
        }
        writer.close();
    }

    public static  void call(){
        try {
            HttpResponse<String> response = Unirest.get("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?fromPublishedDate=2020-05-06&autoCorrect=false&pageNumber=1&pageSize=10&q=On%207%20May%252C%20the%20BJP%20staged%20a%20sit-in%20protest%20at%20Galigad%20Trigam%20(Galigarh)%20village%20(Kishtwar%252C%20J%2526K)%20against%20the%20failure%20to%20arrest%20the%20culprits%20of%20the%20recent%20murder%20of%20a%20RSS%20leader%20as%20well%20as%20the%20earlier%20killing%20of%20BJP%20leader%20and%20his%20brother.%20%255Bsize%253Dno%20report%255D&safeSearch=false")
                    .header("x-rapidapi-host", "contextualwebsearch-websearch-v1.p.rapidapi.com")
                    .header("x-rapidapi-key", "73466ebf72msh20c933d7c0a8018p10fadcjsn840fd961ef8e")
                    .asString(); response = Unirest.get("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?fromPublishedDate=2020-05-06&autoCorrect=false&pageNumber=1&pageSize=10&q=On%207%20May%252C%20the%20BJP%20staged%20a%20sit-in%20protest%20at%20Galigad%20Trigam%20(Galigarh)%20village%20(Kishtwar%252C%20J%2526K)%20against%20the%20failure%20to%20arrest%20the%20culprits%20of%20the%20recent%20murder%20of%20a%20RSS%20leader%20as%20well%20as%20the%20earlier%20killing%20of%20BJP%20leader%20and%20his%20brother.%20%255Bsize%253Dno%20report%255D&safeSearch=false")
                    .header("x-rapidapi-host", "contextualwebsearch-websearch-v1.p.rapidapi.com")
                    .header("x-rapidapi-key", "73466ebf72msh20c933d7c0a8018p10fadcjsn840fd961ef8e")
                    .asString();
            System.out.println(response);
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }



    public static void main(String[] args) throws IOException, SolrServerException {
        call();
        HTTPCaller htp = new HTTPCaller("");
        List<String > list = new ArrayList<>();


//        FileReader reader = new FileReader(new File("/home/vamsidhar/Desktop/TweetsText/IdText.txt"));
//        BufferedReader br = new BufferedReader(reader);
//        FileWriter writer = new FileWriter("/home/vamsidhar/Desktop/TweetsText/TranslatedTweets.txr", true);
//        String line = "";
//        try{
//            while((line = br.readLine()) != null){
//                String id = line.substring(0, line.indexOf(","));
//                String text = line.substring(line.indexOf(",") + 1);
//                String url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q="+ URLEncoder.encode(text.replaceAll(",",""), StandardCharsets.UTF_8.toString());
//                URL urls = new URL(url);
//
//                HttpURLConnection con = (HttpURLConnection) urls.openConnection();
//                con.setRequestMethod("GET");
//                BufferedReader in = new BufferedReader(
//                        new InputStreamReader(con.getInputStream()));
//                String inputLine;
//                String content = "";
//                while ((inputLine = in.readLine()) != null) {
//                    content += inputLine;
//                }
//                content = content.replaceAll("\\[","");
//                content  = content.substring(0, content.indexOf(","));
//                System.out.println(content);
//                writer.write(id+","+content+"\n");
//                in.close();
//            }
//        } catch(Exception e){
//            System.out.println("Hello");
//            e.printStackTrace();
//            writer.close();
//        }

    }
}
