import { createGlobalStyle } from "styled-components";

export const ChatCustom = createGlobalStyle`
  .cs-main-container {
    border-radius: 18px !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important;
    background: white !important;
    overflow: hidden !important;
  }

  /* 메시지 리스트 영역 */
  .cs-message-list {
    background: #f7f7fb !important;
    padding: 14px !important;
  }

  /* 사용자 메시지 */
  .cs-message--outgoing .cs-message__content {
    background: #b8b8b8 !important;
    color: black !important;
    border-radius: 14px !important;
    padding: 11px 17px !important;
    font-size: 14px !important;
  }

  /* 관리자 메시지 */
  .cs-message--incoming .cs-message__content {
    background: #ffffff !important;
    border: 1px solid #e5e7eb !important;
    color: #111827 !important;
    border-radius: 14px !important;
    padding: 10px 14px !important;
    font-size: 15px !important;
  }

  /* 메시지 입력창 */
  .cs-message-input {
    border-top: 1px solid #e5e7eb !important;
    background: #fff !important;
  }

  .cs-message-input__content-editor {
    background: #f8f9fb !important;
    border-radius: 10px !important;
    padding: 10px !important;
  }


`;