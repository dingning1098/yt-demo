package com.ytport.demo.dao;

import com.ytport.base.dao.BaseDao;
import com.ytport.demo.entity.Resource;
import org.springframework.stereotype.Repository;

@Repository("resourceDao")
public class ResourceDao extends BaseDao<Resource, String> {

}