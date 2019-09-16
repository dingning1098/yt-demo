package com.ytport.demo.service.impl;



import com.ytport.base.service.ServiceEx;
import com.ytport.base.service.impl.BaseServiceImpl;
import com.ytport.demo.dao.ResourceDao;
import com.ytport.demo.dao.jdbc.ResourceJdbcDao;
import com.ytport.demo.entity.Resource;
import com.ytport.demo.entity.User;
import com.ytport.demo.service.ResourceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.PropertyFilter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@Transactional(readOnly = true)
public class ResourceServiceImpl extends BaseServiceImpl<Resource, String> implements ResourceService {

    private static Logger logger = LoggerFactory.getLogger(ResourceServiceImpl.class);

    private ResourceDao baseDao;
    @Autowired
    private ResourceDao baseResourceDao;

    @Autowired
    private ResourceJdbcDao resourceJdbcDao;

    @Autowired
    public void setBaseDao(ResourceDao value) {
        super.setBaseDao(value);
        baseDao = value;
    }

    @Override
    public String hql() {
        return "from Resource entity where {where}";
    }

    @Override
    public Resource get(String id) {
        return baseResourceDao.get(id);
    }

    @Override
    public List<Resource> searchAllTree(List<PropertyFilter> filters) {



        String hql = "select distinct entity from Resource entity left join fetch entity.children entity2 "
                + "left join fetch entity2.children entity3 left join fetch entity3.children entity4 "
                + "where entity.levelCode=1 and {where} order by entity.sort asc,entity2.sort asc,entity3.sort asc,entity4.sort asc";

        return baseResourceDao.search(hql, filters);
    }

    @Override
    public List<Resource> searchCanAuthorizeResources(User user) {
        List<PropertyFilter> filters=new ArrayList<PropertyFilter>();
        return this.searchAllTree(filters);
    }

    @Override
    public List<Resource> searchUserResList(String userId) {
        List<PropertyFilter> filters=new ArrayList<PropertyFilter>();
        filters.add(new PropertyFilter("EQS_userId",userId));

        return resourceJdbcDao.searchUserResList(filters);
    }


    @Override
    @Transactional(readOnly = false)
    public void save(Resource resource) throws ServiceEx {

        resource.setAddDate(new Date());
        resource.setModifyDate(new Date());

        baseResourceDao.save(resource);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(String id) throws ServiceEx {
        String hql="select count(entity.id) from Resource entity where entity.parentId=?";
        Long count=baseResourceDao.findUnique(hql,id);
        if(count!=null&&count>0){
            throw new ServiceEx("删除失败！请首先删除子级资源，再删除父资源！");
        }
        baseResourceDao.delete(id);
    }
}

