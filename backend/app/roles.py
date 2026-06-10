from fastapi import Depends, HTTPException
from app.dependencies import verify_token


def admin_required(
    token: dict = Depends(verify_token)
):
    if token.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return token