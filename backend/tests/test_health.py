from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


def test_health_endpoint_reports_demo_ready_status():
    response = client.get("/api/health")

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["app"] == "dashboardy"
    assert "configured_providers" in payload
