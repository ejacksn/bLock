import React from 'react'
import styled from 'styled-components'
import Navbar from '@/components/Dashboard/Navbar'


export default function terms_of_use() {
  return (
    <>
    <Navbar/>
    <Content>
    <H1>Terms and Conditions</H1>
    <H3>Last Updated Feb 2025</H3>
    <P>
    Welcome to chainLink. By accessing or using this site, you agree to be bound by these Terms of Use. If you do not agree to these Terms, do not use the site.
    </P>
    <H2>1. Nature of the Service</H2>
    <P>ChainLink allows users to create and share collections of links. We do not host, store, or control the content that these links lead to. Users are solely responsible for the content they link to.</P>

    <H2>2. User Responsibilities</H2>
    <P>By using ChainLink, you agree:
    </P>
      <UL>
      <li>That you are solely responsible for the links you share and any consequences that arise from sharing them.</li>

      <li>Not to use the Site to facilitate harm, harassment, fraud, or any activity that could lead to legal liability.</li>
      </UL>
    

    <H2>3. Content Moderation and Account Termination</H2>
    <UL>
      <li>
      We reserve the right to remove any content or ban any user for any reason, at our sole discretion, without notice.
      </li>

      <li>
      If we believe content violates laws or exposes us to legal risk, we may remove it and take any necessary action, including banning the user.
      </li>

      <li>
      We are not obligated to monitor content but may do so at our discretion.
      </li>


    </UL>

    <H2>4. No Responsibility for Linked Content</H2>
    <UL>

      <li>
      ChainLink merely provides a way to organize and share links. We do not review, endorse, or assume responsibility for the content of any linked sites.
      </li>

      <li>
      By using ChainLink, you acknowledge that you may encounter content you find objectionable or unlawful. You access such content at your own risk.
      </li>

      <li>
      If you believe a link violates your rights or the law, please contact us, and we may review it at our discretion.
      </li>



    </UL>

    <H2>5. Disclaimer of Warranties</H2>
    <P>chainLink is provided “as is” and without warranty of any kind. We make no guarantees about uptime, reliability, security, or the accuracy of any content posted by users.</P>

    <H2>6. Limitation of Liability</H2>
    <P>To the fullest extent permitted by law, ChainLink and its operators are not liable for any damages arising from your use of the Site, including but not limited to:

Any content accessed through links on the Site.
Account suspension, termination, or content removal.
Any direct, indirect, incidental, consequential, or punitive damages related to your use of ChainLink.</P>

    <H2>7. Indemnification</H2>
    <P>
    You agree to indemnify and hold harmless ChainLink, its owners, and affiliates from any claims, liabilities, damages, or expenses arising from:
    your use of the site, including any content you post or link to.
    </P>

    <H2>8. Changes to These Terms</H2>
    <P>We may update these Terms at any time. Continued use of the Site after changes constitutes acceptance of the updated Terms.</P>

    <H2>9. Governing Law</H2>
    <P>These Terms are governed by the laws of the United States without regard to conflict of law principles.</P>
    </Content>

    
    </>

  )
}
const Content = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;

  background-color: #061003;
  width: 100%;
  height: 100%;
  `

const H1 = styled.h1`
  color: white;
  font-size: 5rem;
  font-weight: 500;
  font-family: poppins, sans-serif;
`
const H2 = styled.h2`
  color: white;
  font-size: 2.5rem;
  font-weight: 500;
  font-family: poppins, sans-serif;
`
const H3 = styled.h3`
  color: white;
  font-size: 2rem;
  font-weight: 500;
  font-family: poppins, sans-serif;
`
const P = styled.p`
  color: white;
  font-size: 1rem;
  font-weight: 100;
  font-family: poppins, sans-serif;
  margin-left: 1rem;
  
`
const UL = styled.ul`
  color: white;
  font-size: 1rem;
  font-weight: 100;
  font-family: poppins, sans-serif;
  margin-left: 2rem;
`
