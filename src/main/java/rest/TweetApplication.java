package rest;

/**
 * Created By ReddyGadu
 * Created On 11/20/19
 * Project Name Information Retrieval
 **/

import services.TweetRequestServices;

import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

public class TweetApplication extends Application {
    private Set<Object> singletons = new HashSet<Object>();

    public TweetApplication() {
        singletons.add(new TweetRequestServices());
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }
}