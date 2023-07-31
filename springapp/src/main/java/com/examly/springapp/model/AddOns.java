package com.example.backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="addons")
public class AddOns {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int addonId;
	private String addonName;
	private int addonPrice;
	private String addonDetails;
//Additional attributes based on front ENd
	private String addonType;
	private String addonValidity;
	private String addonOffers;
	
	
	public AddOns() {
		super();
	}
	public int getAddonId() {
		return addonId;
	}
	public void setAddonId(int addonId) {
		this.addonId = addonId;
	}
	public String getAddonName() {
		return addonName;
	}
	public void setAddonName(String addonName) {
		this.addonName = addonName;
	}
	public int getAddonPrice() {
		return addonPrice;
	}
	public void setAddonPrice(int addonPrice) {
		this.addonPrice = addonPrice;
	}
	
	public String getAddonType() {
		return addonType;
	}
	public void setAddonType(String addonType) {
		this.addonType = addonType;
	}
	
	public String getAddonValidity() {
		return addonValidity;
	}
	public void setAddonValidity(String addonValidity) {
		this.addonValidity = addonValidity;
	}
	
	public String getAddonDetails() {
		return addonDetails;
	}
	public void setAddonDetails(String addonDetails) {
		this.addonDetails = addonDetails;
	}
	public String getAddonOffers() {
		return addonOffers;
	}
	public void setAddonOffers(String addonOffers) {
		this.addonOffers = addonOffers;
	}
	
	
	
	
	
	
	
	
}
