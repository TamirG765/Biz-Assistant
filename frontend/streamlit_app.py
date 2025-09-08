import streamlit as st
import httpx
import os

API_HOST = os.getenv("APP_HOST", "127.0.0.1")
API_PORT = os.getenv("APP_PORT", "8000")
BASE_URL = f"http://{API_HOST}:{API_PORT}"

st.set_page_config(page_title="Biz Licensing Assistant", page_icon="✅", layout="centered")
st.title("Biz Licensing Assistant")
st.caption("Day 1: Streamlit + FastAPI skeleton")

if st.button("Check backend health"):
    try:
        r = httpx.get(f"{BASE_URL}/health", timeout=5.0)
        st.success(f"Health: {r.json()}")
    except Exception as e:
        st.error(f"Failed to reach backend at {BASE_URL}/health\n{e}")

st.write("Backend base URL:", BASE_URL)