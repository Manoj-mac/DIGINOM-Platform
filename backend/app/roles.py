from fastapi import Depends, HTTPException

from app.dependencies import (
    verify_token
)


def get_role(token: dict):

    return token.get(
        "role",
        ""
    ).upper()


def admin_required(
    token: dict = Depends(
        verify_token
    )
):
    if get_role(token) != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return token


def hr_required(
    token: dict = Depends(
        verify_token
    )
):
    if get_role(token) not in [
        "HR",
        "ADMIN"
    ]:

        raise HTTPException(
            status_code=403,
            detail="HR access required"
        )

    return token


def recruiter_required(
    token: dict = Depends(
        verify_token
    )
):
    if get_role(token) not in [
        "RECRUITER",
        "ADMIN"
    ]:

        raise HTTPException(
            status_code=403,
            detail="Recruiter access required"
        )

    return token


def finance_required(
    token: dict = Depends(
        verify_token
    )
):
    if get_role(token) not in [
        "FINANCE",
        "ADMIN"
    ]:

        raise HTTPException(
            status_code=403,
            detail="Finance access required"
        )

    return token


def verifier_required(
    token: dict = Depends(
        verify_token
    )
):
    if get_role(token) not in [
        "VERIFIER",
        "ADMIN"
    ]:

        raise HTTPException(
            status_code=403,
            detail="Verifier access required"
        )

    return token


def employee_required(
    token: dict = Depends(
        verify_token
    )
):
    if get_role(token) not in [
        "EMPLOYEE",
        "ADMIN"
    ]:

        raise HTTPException(
            status_code=403,
            detail="Employee access required"
        )

    return token