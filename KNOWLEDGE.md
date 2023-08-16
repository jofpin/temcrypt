<img src="press/temcrypt-logo.svg" alt="temcrypt" title="temcrypt by Jose Pino" width="200">
<h3>Knowledge</h3>

Discover through this document, all the information necessary to understand the temcrypt encryption mechanism. Created by [**Jose Pino**](https://x.com/jofpin).

- [INSPIRATION](#inspiration)
  
- [SUMMARY](#summary)

- [MAIN FEATURES](#main-features)

- [USE CASES](#use-cases)

- [FINAL REMARKS](#final-remarks)

- [DISCLAIMER](#disclaimer)

## INSPIRATION

As a cybersecurity researcher and passionate about cryptography, I immerse myself daily in reading and studying new ideas. However, I have noticed that current encryption algorithms are static and have not undergone significant evolution in over two decades. This lack of innovation worried me, until in early January 2023, I read in amazement about [Chinese researchers who managed to crack the RSA 2048-bit encryption algorithm](https://arxiv.org/pdf/2212.12372.pdf) using quantum computing with as few as 372 qubits.

This news was a turning point in my search for a more secure and scalable encryption solution. I realized that cryptography must adapt and evolve with the advancement of the processing power of machines. **Start imagining a future with strong encryptions, which must be so complex that it requires high processing power to decrypt them.** This is how the idea of temcrypt was born, a mechanism that seeks to protect confidential data and prevent common risks.

Inspired by [Moore's Law](https://en.wikipedia.org/wiki/Moore%27s_law) and the Bitcoin halving concept, I added 18-month cycles to increase the complexity of temcrypt, I also included its own clock, which increases by one hour every 6 months, I did this thinking that the machines In the future, by not resting, they could have their own machine time, which also helps in temcrypt so that the user can encrypt their information in scalable hours, but not in a static hour as we know it, which only includes 24 hours. The dependency to decrypt the information is subject to one unique key, the time it was encrypted, and the processing power of the machine. Through a proof of concept, I have shown that encryption can be scalable and more secure in this new era where data protection is paramount, especially with advances in artificial intelligence that will further complicate security issues.

I want to point out that temcrypt is not intended to be a defense against brute force attacks using quantum computing, but it does offer better security against the most common attacks in traditional computing. My wish is that you can use temcrypt in an ethical and responsible way, integrating it into your projects to strengthen the security of your data. However, I strongly urge you not to use it for malicious purposes, such as ransomware attacks.

My name is [Jose Pino](https://x.com/jofpin). I will always be creating things, and this is one of them that has motivated me to share with all of you. I hope you enjoy it and share it with your friends, coworkers, developers, lawyers, journalists, and people around the world who deserve to protect their most confidential data. **We need more advanced encryption technologies for today**, and I have decided to offer temcrypt for free to everyone, with the goal of contributing to a safer digital world.

## SUMMARY

temcrypt is an innovative encryption mechanism designed to protect highly sensitive data. Its unique approach employs multiple layers of encryption, scalability over time, and resistance to common brute force attacks, providing effective protection in an era where data security is paramount.

![temcrypt](press/temcrypt-grid.png)

One key feature of temcrypt is the integration of standard encryption algorithms, such as **[AES-256](https://wikipedia.org/wiki/Advanced_Encryption_Standard)** with symmetric key and the secure key generation algorithm **[SHA-256](https://wikipedia.org/wiki/SHA-2)**. These are strategically implemented within temcrypt to provide the highest level of security to date.

By implementing temcrypt capabilities, data is encrypted with dynamic complexity that evolves over time, ensuring greater security and resistance to brute force attack advances. Plus, its multi-layered approach adds an extra protection advantage for your most critical and sensitive data.

In summary, temcrypt is like a steroid in encryption, offering robust security and effective defense against potential threats. Below you can explore all the features and capabilities of the mechanism:

### MAIN FEATURES

 1.  **KEYS AND TIME:** When encrypting data, a mainKey provided by the user in a personalized manner is used, which is combined with the moment when the encryption takes place, known as timeKey. The timeKey consists of the hour and minute when the encryption occurs, and the seconds are used for an encoded wrapping. It is important to note that, when decrypting the information, it is necessary to use the same mainKey and timeKey that were used at the time of encryption.  

> In other words, the information can only be decrypted if the correct
> mainKey and exact moment of encryption are provided, which may be in
> the same hour and minute on the following days.

2. **MAINKEY EQUATION:** The mainKey structure in temcrypt follows a process of mixing and concatenating elements to generate a unique key. This structure can be represented by the following mathematical equation:

   **mainKey** = S2(S1(P) + U + T + D)

      - **STRUCTURE**:

        * **P** represents the prefix used by temcrypt to improve the randomness of the mainKey.
        * **U** represents the user's key, that is, the password or secret key provided by the user.
        * **T** represents the time key, which includes information about the date and time that the encryption is performed.
        * **D** represents the location of the additional digit, which changes with each encryption operation and an additional one is added every 18 months improving the complexity of the main key.
        * **S1()** is a global shuffle function used by temcrypt to rearrange the characters of the **P** prefix and improve the security of the mainKey.
        * **S2()** is another shuffle function used to rearrange and shuffle the results of S1(P) + U + T + D and generate the final mainKey.
        
          For example, if the prefix **P** is "T3M", the user key **U** is "12345", the time key **T** is "1943", and the location of the additional digit **D** is "1", then the mainKey would be:

          **mainKey** = S2(S1("T3M") + "12345" + "1943" + "1")
          
           Assuming that the merge functions S1() and S2() produce the result `T3M1234519431`, the final mainKey would be:
           
           - OPTION 1: **mainKey** = "T3M1234519431"
           - OPTION 2: **mainKey** = "123451943TM31"
           
           This structure ensures that each mainKey is unique and bound to specific user and time information.

 3.  **SCALABILITY OVER TIME:** The temcrypt mechanism varies based on the elapsed time, making the decryption process more difficult to predict for an attacker (as the years go by, temcrypt becomes more secure).

      **SCALABILITY DETAILS**
        - **Improvement cycle**: Every **18 months**, temcrypt adds an additional digit of complexity to its encryption process. This results in a significant increase in the encryption's resistance and the security of the main key, requiring twice the processing power to decrypt the information. This periodic enhancement ensures that temcrypt adapts to the growing computational capabilities.
      
      - **Base time**: It has its own internal clock, which advances at a predefined pace. Every **6 months**, an hour is automatically added to the clock, extending the days within the encryption mechanism. This feature adds an additional dimension of unpredictability to the decryption process, as the individualized base time affects the complexity of the encryption and varies for each user. In this way, even two users with the same encrypted information will obtain different decryption results due to their unique times.

4. **MULTI-LAYERS:** It employs a multi-layered approach to data encryption using **AES-256**, and for the keys, it uses **SHA-256**. These layers work together to provide an additional level of protection:

   - **Layer 0:**   Known as the phantom layer, it encrypts the information in the **string** variable of the main object called `tem` with a random **SHA-256** token that is stored in a variable called token, known only to the system.
   
   - **Layer 1:** In this stage, the object containing the previously encrypted data, including the ghost layer, is encrypted. To do this, the main key provided by the user is divided into two keys, using the **SHA-256** algorithm. The first part of this key is used to encrypt this first layer.
   
   - **Layer 2:** The second layer is encrypted using the second part of the **SHA-256** key.
  
   - **Wrapper:** Upon completion of encryption, temcrypt employs a strategic hexadecimal encoding mechanism to process the encrypted result. This process begins with a full rollback of 100% of the encrypted characters. Next, a special transformation is applied using the seconds value of the current moment. This transformation consists of placing the hexadecimal value of the beginning of the encryption at the end and the hexadecimal value of the end at the beginning, added to the dependence on the `T3M` prefix. This additional wrapping, combined with the complexity of layered encryption and the variable time approach, adds an additional layer of security and makes any attempt to decrypt data without the correct key and exact timing significantly more difficult.

5. **BRUTE FORCE RESISTANCE:** One of the most prominent features of temcrypt is its exceptional resistance to common brute force attacks. This unique approach greatly hinders any attempt to decrypt the information without the correct key and the precise time (hour:minute) in which the information was encrypted. Even with the use of considerable computational resources, the task becomes practically impossible.

      - **Unique Key Generation:** The key used in temcrypt is unique and is generated by a specialized process. It starts with a characteristic prefix of 3 unique and random characters, to which is added an additional digit that increases as time cycles elapse. This ensures that the complexity of the encryption increases progressively, offering greater protection over time.
      
      - **Full Key Mix:** The uniqueness of the key does not end there. After adding the extra digit and other temcrypt specific elements, the mainKey undergoes a complete "shuffling" process. This process makes the arrangement of the characters in the key completely random and highly unpredictable, further increasing the security of the encryption.
      
      - **Custom Brute Force Approach:** When a user decrypts their information with temcrypt, it performs a custom brute force process using their own correct data to access the encrypted information. That is, the user must provide the correct key and the exact time it was used to encrypt the data. Doing so starts the decryption process and temcrypt performs a check in a specified time range to find the correct key combination, along with the exact hour and minute. This "custom brute force" approach makes decrypting information without the correct key and exact timing virtually impossible, even with the use of considerable computational resources.
      
6. **EXTRA BYTES:** This function allows the user to enter additional custom bytes during the encryption process at **Layer 0** within the `tem` object. These extra bytes are uniquely added to the encrypted data, increasing the size of the encrypted data and requiring more processing power to decrypt the data.

7. **LAST DECRYPTION DATE:** Every time you decrypt the information from a `.trypt` file or a string encrypted with temcrypt, the `lastDecryptionDate` value is automatically updated. This value belongs to the `tem` object, which stores the latest decryption date of the encryption. This feature allows you to keep track of the most recent decryption activity, giving you valuable insights into when the information was last accessed and decrypted.

8. **VERIFICATION HASH:** When encrypting the data, a verification `hash` is generated to ensure the authenticity of the encrypted content. This hash serves as a security measure to verify the integrity of the encrypted data. With temcrypt, you can check if the `hash` matches the **encrypted content**, ensuring the legitimacy of your encrypted data. This feature is especially useful for database implementations and organized data management.

9. **REFORMED DECRYPTION:** When decrypting data from a `.trypt` file or a temcrypt encrypted string, the internal structure of its key is reshaped by changing its order. Also, temcrypt checks if time has advanced since the last encryption. For example, if 18 months have passed, an additional digit of complexity is automatically added to the key of the same encrypted file or data, without the need to re-encrypt the information. Basically, each time you decrypt your information it is more secure (because of the change in the order of the main key, which helps to avoid brute force attacks a lot more). 

## USE CASES
The potential of temcrypt knows no bounds, limited only by your imagination. Below, you'll discover some use cases that can guide and inspire you as you harness its power:

   1. **SEED PHRASES PROTECTION FOR A CRYPTO WALLET (12 OR 24 WORDS)**

      The 12 or 24 recovery words (seed phrase) are essential to access and recover a cryptocurrency wallet. These words represent the master key that allows access to the associated digital assets. Therefore, its security is of the utmost importance to users.

      To protect their 12 or 24 recovery words, a user can use temcrypt as an additional layer of security. The user creates his custom mainKey and automatically sets the timeKey, which could be the exact hour and minute at the time of encryption.

      The user then encrypts their recovery words using temcrypt, ensuring that they can only be accessed by the user with the correct mainKey and timeKey. In case of loss or theft of his cryptocurrency wallet, the user can trust that his recovery words are protected and that only he has the ability to decrypt them and recover his digital assets.

2. **PROTECTION OF CONFIDENTIAL BUSINESS DATA**

      Let's imagine a company that handles highly confidential information, such as financial data, business strategies and development plans. Using temcrypt provides an additional layer of security to protect this sensitive data.

      A company executive wants to send an important financial report to a team member, but is concerned about data security. With temcrypt, the exec encrypts the report using its custom mainKey and the corresponding timeKey, which includes the exact hour and minute of the time of encryption.

      The encrypted report is sent to the team member, who, to decrypt the information, must enter the same mainKey with the same encryption time, which must be the same hour and minute, but from the next day. By doing so, the team member can access the confidential report securely, while any attempt to decrypt the information without the exact key and time is rendered virtually impossible due to temcrypt resistance to brute force attacks.

3. **SHARING CONFIDENTIAL FILES BETWEEN USERS**

      A research team collaborates on a highly confidential project that involves sharing files between team members. To ensure data security, they use temcrypt to encrypt and decrypt the files.

      Each team member generates their own custom mainKey, and when they share a file, they encrypt the data using their mainKey along with the appropriate timeKey. Team members must communicate with each other to coordinate the timing of the encryption and ensure that everyone uses the same hour and minute for the timeKey.

      By using temcrypt in this way, the team can share sensitive files with peace of mind, knowing that only authorized members with the right key and the right time can access the information.

## FINAL REMARKS

temcrypt as an advanced next generation encryption mechanism, with its scalability over time and resistance to common brute force attacks make it an exceptional choice for protecting highly sensitive data. temcrypt combination of unique features ensures data confidentiality and integrity, providing strong security in an increasingly complex digital environment. With temcrypt, individuals and companies can be sure that their sensitive data is protected against common unauthorized access attempts or malicious attacks.

## DISCLAIMER

temcrypt is an encryption tool designed to provide an additional layer of security in protecting sensitive data. Although I have made efforts to create a mechanism that is robust and resistant to the most common attacks to date, I cannot guarantee absolute invulnerability against new and unknown advanced computer threats.

I recommend using temcrypt ethically and legally. In no event shall the temcrypt developer be liable for any direct, indirect, special, incidental or consequential damages arising out of the use or inability to use the mechanism, such as forgetting your main key or forgetting time including exact hour and minute of its encryption.
