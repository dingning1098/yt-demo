package com.ytport.demo.dao;

import com.ytport.demo.entity.DemoWorker;
import com.ytport.base.dao.BaseDao;
import org.springframework.stereotype.Repository;

@Repository("demoWorkerDao")
public class DemoWorkerDao extends BaseDao<DemoWorker, String> {

}