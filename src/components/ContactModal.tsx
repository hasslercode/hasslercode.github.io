"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { useContact } from "./ContactProvider";
import { siteConfig } from "@/lib/site";

type Step = "channels" | "email";

export function ContactModal() {
  const t = useTranslations("contactModal");
  const { isOpen, closeContact } = useContact();
  const titleId = useId();
  const [step, setStep] = useState<Step>("channels");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setStep("channels");
    setName("");
    setEmail("");
    setMessage("");
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(t("subject"));
    const body = encodeURIComponent(
      [
        t("greeting"),
        "",
        message.trim(),
        "",
        "—",
        `${t("fromName")}: ${name.trim()}`,
        `${t("fromEmail")}: ${email.trim()}`,
      ].join("\n"),
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    closeContact();
  }

  const showingForm = step === "email";

  return (
    <div
      className="contact-overlay"
      role="presentation"
      onClick={closeContact}
    >
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="contact-modal-head">
          <div>
            {showingForm ? (
              <button
                type="button"
                className="contact-back"
                onClick={() => setStep("channels")}
              >
                <i className="fas fa-arrow-left" aria-hidden="true" />
                {t("back")}
              </button>
            ) : (
              <p className="mono-label">{t("label")}</p>
            )}
            <h2 id={titleId}>{showingForm ? t("formTitle") : t("title")}</h2>
            <p className="contact-modal-lead">
              {showingForm ? t("formLead") : t("lead")}
            </p>
          </div>
          <button
            type="button"
            className="contact-close"
            onClick={closeContact}
            aria-label={t("close")}
          >
            <i className="fas fa-xmark" aria-hidden="true" />
          </button>
        </div>

        {!showingForm ? (
          <div className="contact-channels">
            <button
              type="button"
              className="contact-channel"
              onClick={() => setStep("email")}
            >
              <span className="contact-channel-icon" aria-hidden="true">
                <i className="fas fa-envelope" />
              </span>
              <span>
                <strong>{t("email")}</strong>
                <small>{siteConfig.email}</small>
              </span>
            </button>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel"
            >
              <span className="contact-channel-icon" aria-hidden="true">
                <i className="fab fa-linkedin-in" />
              </span>
              <span>
                <strong>{t("linkedin")}</strong>
                <small>{t("linkedinHint")}</small>
              </span>
            </a>
            <a href={`tel:${siteConfig.phone}`} className="contact-channel">
              <span className="contact-channel-icon" aria-hidden="true">
                <i className="fas fa-phone" />
              </span>
              <span>
                <strong>{t("phone")}</strong>
                <small>+57 300 336 5369</small>
              </span>
            </a>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contact-field">
              <span>{t("name")}</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                autoFocus
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t("namePlaceholder")}
              />
            </label>

            <label className="contact-field">
              <span>{t("yourEmail")}</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("emailPlaceholder")}
              />
            </label>

            <label className="contact-field">
              <span>{t("message")}</span>
              <textarea
                name="message"
                rows={5}
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={t("messagePlaceholder")}
              />
            </label>

            <button type="submit" className="btn-primary contact-submit">
              <i className="fas fa-paper-plane" aria-hidden="true" />
              {t("send")}
            </button>
            <p className="contact-hint">{t("mailtoHint")}</p>
          </form>
        )}
      </div>
    </div>
  );
}
