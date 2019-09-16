package com.ytport.demo.service.impl;


import com.ytport.base.service.ServiceEx;
import com.ytport.demo.dao.WorkerRecordDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ytport.demo.entity.WorkerCar;
import com.ytport.demo.dao.WorkerCarDao;
import com.ytport.demo.service.WorkerCarService;
import com.ytport.base.service.impl.BaseServiceImpl;

import java.util.List;

@Component
@Transactional(readOnly = true)
public class WorkerCarServiceImpl extends BaseServiceImpl<WorkerCar,String> implements WorkerCarService{
	
	private static Logger logger = LoggerFactory.getLogger(WorkerCarServiceImpl.class);
	
	private WorkerCarDao baseDao;

	private WorkerRecordDao workerRecordDao;
	
	@Autowired
	public void setBaseDao( WorkerCarDao value){
		super.setBaseDao(value);
		baseDao=value;
	}

	@Override
	public String hql(){
		return "from WorkerCar entity where {where} order by {order}";
	}

	@Override
	@Transactional(readOnly = false)
	public void save(WorkerCar t) throws ServiceEx {

		//只有新增时进行判断是否为存在
		if(t.getEditState()==0) {
			//1.判断是否存在重复的车牌号信息
			List<WorkerCar> listCar = this.baseDao.find("from WorkerCar where carNo=?", t.getCarNo());
			if (null != listCar && listCar.size() > 0) {
				throw new ServiceEx("您录入的车牌号:" + t.getCarNo() + " 已经存在!" + "属于职工:" + t.getWorkerNam());
			}
			//2.判断该职工是否已经录入车辆信息
			List<WorkerCar> listWor = this.baseDao.find("from WorkerCar where workerCod=?", t.getWorkerCod());
			if (null != listWor && listWor.size() > 0) {
				throw new ServiceEx("当前职工:" + t.getWorkerNam() + " 已经录入车辆信息!");
			}
		}
		//只有更新时进行判断是否为存在
		if(t.getEditState()==1) {
			//1.判断是否存在重复的车牌号信息
			List<WorkerCar> listCar = this.baseDao.find("from WorkerCar where carNo=? and workerCod <> ?", t.getCarNo(),t.getWorkerCod());
			if (null != listCar && listCar.size() > 0) {
				throw new ServiceEx("您录入的车牌号:" + t.getCarNo() + " 已经存在!" + "属于职工:" + t.getWorkerNam());
			}
		}

		this.baseDao.save(t);
	}
}

