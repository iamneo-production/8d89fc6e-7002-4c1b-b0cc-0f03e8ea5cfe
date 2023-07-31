package com.example.backend.Model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="recharge")
public class Recharges {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int rechargeId;
	private String rechargeType;
	private String name;
	private String mobile;
	private String email;
	private int rechargePlan;
	private int rechargePrice;
	
	public int getRechargeId() {
		return rechargeId;
	}
	public void setRechargeId(int rechargeId) {
		this.rechargeId = rechargeId;
	}
	public String getRechargeType() {
		return rechargeType;
	}
	public void setRechargeType(String rechargeType) {
		this.rechargeType = rechargeType;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getRechargePlan() {
		return rechargePlan;
	}
	public void setRechargePlan(int rechargePlan) {
		this.rechargePlan = rechargePlan;
	}
	public int getRechargePrice() {
		return rechargePrice;
	}
	public void setRechargePrice(int rechargePrice) {
		this.rechargePrice = rechargePrice;
	}
}
